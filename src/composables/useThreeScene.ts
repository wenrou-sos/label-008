import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { FloorPlan, Room, StyleMaterials, FurnitureConfig, StyleId } from '../types'
import { floorPlans } from '../data/floorPlans'
import { designStyles } from '../data/styles'

export function useThreeScene() {
  const container = ref<HTMLElement | null>(null)
  const scene = shallowRef<THREE.Scene | null>(null)
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null)
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
  const orbitControls = shallowRef<OrbitControls | null>(null)
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const houseGroup = shallowRef<THREE.Group | null>(null)
  const furnitureGroup = shallowRef<THREE.Group | null>(null)
  const wallMaterials = ref<THREE.MeshStandardMaterial[]>([])
  const floorMaterials = ref<THREE.MeshStandardMaterial[]>([])
  const ceilingMaterials = ref<THREE.MeshStandardMaterial[]>([])

  const currentFloorPlanId = ref<string>('two-room')
  const currentStyleId = ref<StyleId>('modern')
  const selectedFurniture = ref<FurnitureConfig | null>(null)
  const selectedFurnitureMesh = ref<THREE.Mesh | null>(null)
  const isFirstPersonMode = ref(false)

  let animationId: number | null = null
  const keys: Record<string, boolean> = {}
  const euler = new THREE.Euler(0, 0, 0, 'YXZ')
  let yaw = 0
  let pitch = 0
  let pointerLocked = false

  const COLLISION_MARGIN = 0.5

  function initScene(containerEl: HTMLElement) {
    container.value = containerEl

    scene.value = new THREE.Scene()
    scene.value.background = new THREE.Color(0xf5f5f5)
    scene.value.fog = new THREE.Fog(0xf5f5f5, 20, 60)

    const aspect = containerEl.clientWidth / containerEl.clientHeight
    camera.value = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000)
    camera.value.position.set(0, 8, 10)

    renderer.value = new THREE.WebGLRenderer({ antialias: true })
    renderer.value.setSize(containerEl.clientWidth, containerEl.clientHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.value.shadowMap.enabled = true
    renderer.value.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.value.toneMapping = THREE.ACESFilmicToneMapping
    renderer.value.toneMappingExposure = 1.0
    containerEl.appendChild(renderer.value.domElement)

    orbitControls.value = new OrbitControls(camera.value, renderer.value.domElement)
    orbitControls.value.enableDamping = true
    orbitControls.value.dampingFactor = 0.05
    orbitControls.value.maxPolarAngle = Math.PI / 2.05
    orbitControls.value.minDistance = 2
    orbitControls.value.maxDistance = 30
    orbitControls.value.target.set(0, 1, 0)

    setupLights()

    houseGroup.value = new THREE.Group()
    scene.value.add(houseGroup.value)
    furnitureGroup.value = new THREE.Group()
    scene.value.add(furnitureGroup.value)

    buildHouse()
    buildFurniture()

    animate()

    window.addEventListener('resize', onWindowResize)
    renderer.value.domElement.addEventListener('click', onCanvasClick)
    renderer.value.domElement.addEventListener('mousemove', onMouseMove)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    document.addEventListener('mousemove', onPointerMove)
  }

  function setupLights() {
    if (!scene.value) return

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.value.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(10, 15, 10)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 50
    dirLight.shadow.camera.left = -20
    dirLight.shadow.camera.right = 20
    dirLight.shadow.camera.top = 20
    dirLight.shadow.camera.bottom = -20
    dirLight.shadow.bias = -0.0005
    scene.value.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0xffeecc, 0.3)
    fillLight.position.set(-5, 5, -5)
    scene.value.add(fillLight)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4)
    scene.value.add(hemiLight)
  }

  function getCurrentFloorPlan(): FloorPlan {
    return floorPlans.find(f => f.id === currentFloorPlanId.value) || floorPlans[0]
  }

  function getCurrentStyle() {
    return designStyles.find(s => s.id === currentStyleId.value) || designStyles[0]
  }

  function buildHouse() {
    if (!houseGroup.value || !scene.value) return

    while (houseGroup.value.children.length > 0) {
      const child = houseGroup.value.children[0]
      houseGroup.value.remove(child)
    }
    wallMaterials.value = []
    floorMaterials.value = []
    ceilingMaterials.value = []

    const plan = getCurrentFloorPlan()
    const style = getCurrentStyle()

    plan.rooms.forEach(room => {
      buildRoom(room, style.materials)
    })
  }

  function buildRoom(room: Room, materials: StyleMaterials) {
    if (!houseGroup.value) return

    const { width, depth, height } = room.size
    const { x, z } = room.position

    const floorGeo = new THREE.PlaneGeometry(width, depth)
    const floorMat = new THREE.MeshStandardMaterial({
      color: materials.floor.color,
      roughness: materials.floor.roughness ?? 0.7,
      metalness: materials.floor.metalness ?? 0.0
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(x, 0, z)
    floor.receiveShadow = true
    floor.userData = { type: 'floor', roomId: room.id }
    houseGroup.value.add(floor)
    floorMaterials.value.push(floorMat)

    const ceilingGeo = new THREE.PlaneGeometry(width, depth)
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: materials.ceiling.color,
      roughness: 0.9
    })
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat)
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.set(x, height, z)
    ceiling.userData = { type: 'ceiling', roomId: room.id }
    houseGroup.value.add(ceiling)
    ceilingMaterials.value.push(ceilingMat)

    const wallThickness = 0.1
    const wallHeight = height
    const wallMat = new THREE.MeshStandardMaterial({
      color: materials.wall.color,
      roughness: materials.wall.roughness ?? 0.85,
      side: THREE.DoubleSide
    })
    wallMaterials.value.push(wallMat)

    const backWallGeo = new THREE.PlaneGeometry(width, wallHeight)
    const backWall = new THREE.Mesh(backWallGeo, wallMat)
    backWall.position.set(x, wallHeight / 2, z - depth / 2)
    backWall.castShadow = true
    backWall.receiveShadow = true
    backWall.userData = { type: 'wall', roomId: room.id, wallNormal: new THREE.Vector3(0, 0, 1) }
    houseGroup.value.add(backWall)

    const frontWallGeo = new THREE.PlaneGeometry(width, wallHeight)
    const frontWall = new THREE.Mesh(frontWallGeo, wallMat)
    frontWall.position.set(x, wallHeight / 2, z + depth / 2)
    frontWall.rotation.y = Math.PI
    frontWall.castShadow = true
    frontWall.receiveShadow = true
    frontWall.userData = { type: 'wall', roomId: room.id, wallNormal: new THREE.Vector3(0, 0, -1) }
    houseGroup.value.add(frontWall)

    const leftWallGeo = new THREE.PlaneGeometry(depth, wallHeight)
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat)
    leftWall.position.set(x - width / 2, wallHeight / 2, z)
    leftWall.rotation.y = Math.PI / 2
    leftWall.castShadow = true
    leftWall.receiveShadow = true
    leftWall.userData = { type: 'wall', roomId: room.id, wallNormal: new THREE.Vector3(1, 0, 0) }
    houseGroup.value.add(leftWall)

    const rightWallGeo = new THREE.PlaneGeometry(depth, wallHeight)
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat)
    rightWall.position.set(x + width / 2, wallHeight / 2, z)
    rightWall.rotation.y = -Math.PI / 2
    rightWall.castShadow = true
    rightWall.receiveShadow = true
    rightWall.userData = { type: 'wall', roomId: room.id, wallNormal: new THREE.Vector3(-1, 0, 0) }
    houseGroup.value.add(rightWall)

    if (room.hasWindow && room.windowPosition) {
      buildWindow(room.windowPosition, materials)
    }

    void wallThickness
  }

  function buildWindow(pos: { x: number; y: number; z: number }, materials: StyleMaterials) {
    if (!houseGroup.value) return

    const windowWidth = 1.5
    const windowHeight = 1.2

    const frameGeo = new THREE.BoxGeometry(windowWidth + 0.1, windowHeight + 0.1, 0.08)
    const frameMat = new THREE.MeshStandardMaterial({
      color: materials.windowFrame.color,
      roughness: 0.5,
      metalness: 0.3
    })
    const frame = new THREE.Mesh(frameGeo, frameMat)
    frame.position.set(pos.x, pos.y, pos.z)
    houseGroup.value.add(frame)

    const glassGeo = new THREE.PlaneGeometry(windowWidth, windowHeight)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      metalness: 0,
      transmission: 0.9,
      thickness: 0.05
    })
    const glass = new THREE.Mesh(glassGeo, glassMat)
    glass.position.set(pos.x, pos.y, pos.z + 0.01)
    houseGroup.value.add(glass)
  }

  function buildFurniture() {
    if (!furnitureGroup.value) return

    while (furnitureGroup.value.children.length > 0) {
      const child = furnitureGroup.value.children[0]
      furnitureGroup.value.remove(child)
    }

    const style = getCurrentStyle()
    style.furniture.forEach(furniture => {
      const mesh = createFurnitureMesh(furniture)
      if (mesh) {
        furnitureGroup.value!.add(mesh)
      }
    })
  }

  function createFurnitureMesh(config: FurnitureConfig): THREE.Mesh | null {
    const { type, size, color, position, rotation } = config
    let geometry: THREE.BufferGeometry | null = null

    switch (type) {
      case 'sofa':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'bed':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'table':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'cabinet':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'wardrobe':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'tv':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'chair':
      case 'dining_chair':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      case 'bedside_table':
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
        break
      default:
        geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
    }

    if (!geometry) return null

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.6,
      metalness: 0.1
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position.x, position.y + size.height / 2, position.z)
    mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { type: 'furniture', config, originalScale: mesh.scale.clone() }

    return mesh
  }

  function updateStyleMaterials(styleId: StyleId) {
    currentStyleId.value = styleId
    const style = getCurrentStyle()
    const { materials } = style

    const duration = 500
    const startTime = Date.now()

    const wallTargets = materials.wall
    const floorTargets = materials.floor
    const ceilingTargets = materials.ceiling

    wallMaterials.value.forEach(mat => {
      const startColor = mat.color.clone()
      const targetColor = new THREE.Color(wallTargets.color)
      animateColor(mat, startColor, targetColor, startTime, duration)
    })

    floorMaterials.value.forEach(mat => {
      const startColor = mat.color.clone()
      const targetColor = new THREE.Color(floorTargets.color)
      animateColor(mat, startColor, targetColor, startTime, duration)
    })

    ceilingMaterials.value.forEach(mat => {
      const startColor = mat.color.clone()
      const targetColor = new THREE.Color(ceilingTargets.color)
      animateColor(mat, startColor, targetColor, startTime, duration)
    })

    buildFurniture()
    clearSelectedFurniture()
  }

  function animateColor(
    mat: THREE.MeshStandardMaterial,
    start: THREE.Color,
    target: THREE.Color,
    startTime: number,
    duration: number
  ) {
    function update() {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      mat.color.copy(start).lerp(target, eased)
      if (t < 1) {
        requestAnimationFrame(update)
      }
    }
    update()
  }

  function switchFloorPlan(planId: string) {
    currentFloorPlanId.value = planId
    buildHouse()
    buildFurniture()
    clearSelectedFurniture()

    if (!isFirstPersonMode.value && orbitControls.value && camera.value) {
      camera.value.position.set(0, 8, 10)
      orbitControls.value.target.set(0, 1, 0)
      orbitControls.value.update()
    } else if (isFirstPersonMode.value && camera.value) {
      camera.value.position.set(0, 1.6, 2)
      yaw = 0
      pitch = 0
    }
  }

  function onCanvasClick(event: MouseEvent) {
    if (!container.value || !scene.value || !camera.value) return

    const rect = container.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera.value)

    const furnitureMeshes: THREE.Object3D[] = []
    furnitureGroup.value?.traverse(child => {
      if (child instanceof THREE.Mesh && child.userData.type === 'furniture') {
        furnitureMeshes.push(child)
      }
    })

    const intersects = raycaster.intersectObjects(furnitureMeshes, false)

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh
      const config = hit.userData.config as FurnitureConfig
      selectFurniture(hit, config)
    } else {
      clearSelectedFurniture()
    }
  }

  function selectFurniture(mesh: THREE.Mesh, config: FurnitureConfig) {
    clearSelectedFurniture()
    selectedFurniture.value = config
    selectedFurnitureMesh.value = mesh
    mesh.scale.multiplyScalar(1.05)
    const mat = mesh.material as THREE.MeshStandardMaterial
    mat.emissive = new THREE.Color(0xd4a853)
    mat.emissiveIntensity = 0.2
  }

  function clearSelectedFurniture() {
    if (selectedFurnitureMesh.value) {
      const mesh = selectedFurnitureMesh.value
      if (mesh.userData.originalScale) {
        mesh.scale.copy(mesh.userData.originalScale)
      }
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(0x000000)
      mat.emissiveIntensity = 0
      selectedFurnitureMesh.value = null
    }
    selectedFurniture.value = null
  }

  function onMouseMove(event: MouseEvent) {
    if (!container.value || !scene.value || !camera.value) return

    const rect = container.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera.value)

    const furnitureMeshes: THREE.Object3D[] = []
    furnitureGroup.value?.traverse(child => {
      if (child instanceof THREE.Mesh && child.userData.type === 'furniture') {
        furnitureMeshes.push(child)
      }
    })

    const intersects = raycaster.intersectObjects(furnitureMeshes, false)
    if (container.value) {
      container.value.style.cursor = intersects.length > 0 ? 'pointer' : 'default'
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    keys[e.code] = true

    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      if (!isFirstPersonMode.value) {
        enterFirstPersonMode()
      }
    }

    if (e.code === 'Escape' && isFirstPersonMode.value) {
      exitFirstPersonMode()
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    keys[e.code] = false
  }

  function enterFirstPersonMode() {
    isFirstPersonMode.value = true
    if (orbitControls.value) {
      orbitControls.value.enabled = false
    }
    if (camera.value) {
      camera.value.position.set(0, 1.6, 2)
      camera.value.fov = 75
      camera.value.updateProjectionMatrix()
    }
    yaw = 0
    pitch = 0
    if (renderer.value) {
      renderer.value.domElement.requestPointerLock()
    }
  }

  function exitFirstPersonMode() {
    isFirstPersonMode.value = false
    pointerLocked = false
    if (document.pointerLockElement) {
      document.exitPointerLock()
    }
    if (orbitControls.value) {
      orbitControls.value.enabled = true
    }
    if (camera.value) {
      camera.value.position.set(0, 8, 10)
      camera.value.fov = 60
      camera.value.updateProjectionMatrix()
      orbitControls.value?.target.set(0, 1, 0)
      orbitControls.value?.update()
    }
  }

  function onPointerLockChange() {
    pointerLocked = document.pointerLockElement === renderer.value?.domElement
  }

  function onPointerMove(e: MouseEvent) {
    if (!pointerLocked || !camera.value) return

    const sensitivity = 0.002
    yaw -= e.movementX * sensitivity
    pitch -= e.movementY * sensitivity

    const maxPitch = Math.PI / 2 - 0.01
    pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch))
  }

  function checkCollision(newPos: THREE.Vector3): boolean {
    if (!houseGroup.value) return false

    const plan = getCurrentFloorPlan()
    for (const room of plan.rooms) {
      const halfW = room.size.width / 2 - COLLISION_MARGIN
      const halfD = room.size.depth / 2 - COLLISION_MARGIN
      const minX = room.position.x - halfW
      const maxX = room.position.x + halfW
      const minZ = room.position.z - halfD
      const maxZ = room.position.z + halfD

      if (
        newPos.x >= minX && newPos.x <= maxX &&
        newPos.z >= minZ && newPos.z <= maxZ
      ) {
        return false
      }
    }
    return true
  }

  function updateFirstPerson(delta: number) {
    if (!camera.value || !isFirstPersonMode.value) return

    const speed = 4.0 * delta

    euler.setFromQuaternion(camera.value.quaternion)
    euler.y = yaw
    euler.x = pitch
    camera.value.quaternion.setFromEuler(euler)

    const forward = new THREE.Vector3(0, 0, -1)
    forward.applyQuaternion(camera.value.quaternion)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3(1, 0, 0)
    right.applyQuaternion(camera.value.quaternion)
    right.y = 0
    right.normalize()

    const move = new THREE.Vector3()

    if (keys['KeyW']) move.add(forward)
    if (keys['KeyS']) move.sub(forward)
    if (keys['KeyD']) move.add(right)
    if (keys['KeyA']) move.sub(right)

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed)
      const newPos = camera.value.position.clone().add(move)
      newPos.y = 1.6

      if (!checkCollision(newPos)) {
        camera.value.position.copy(newPos)
      } else {
        const testX = camera.value.position.clone()
        testX.x = newPos.x
        if (!checkCollision(testX)) {
          camera.value.position.x = newPos.x
        }

        const testZ = camera.value.position.clone()
        testZ.z = newPos.z
        if (!checkCollision(testZ)) {
          camera.value.position.z = newPos.z
        }
      }
    }
  }

  function animate() {
    animationId = requestAnimationFrame(animate)

    let delta = 1 / 60
    const now = performance.now()
    if ((animate as any).lastTime !== undefined) {
      delta = Math.min((now - (animate as any).lastTime) / 1000, 0.1)
    }
    (animate as any).lastTime = now

    if (isFirstPersonMode.value) {
      updateFirstPerson(delta)
    } else {
      orbitControls.value?.update()
    }

    if (renderer.value && scene.value && camera.value) {
      renderer.value.render(scene.value, camera.value)
    }
  }

  function onWindowResize() {
    if (!container.value || !camera.value || !renderer.value) return
    const width = container.value.clientWidth
    const height = container.value.clientHeight
    camera.value.aspect = width / height
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(width, height)
  }

  function dispose() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }

    window.removeEventListener('resize', onWindowResize)
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)
    document.removeEventListener('pointerlockchange', onPointerLockChange)
    document.removeEventListener('mousemove', onPointerMove)

    if (renderer.value) {
      renderer.value.domElement.removeEventListener('click', onCanvasClick)
      renderer.value.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.value.dispose()
    }

    scene.value?.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material?.dispose()
        }
      }
    })
  }

  onMounted(() => {
    // Container will be set by component
  })

  onUnmounted(() => {
    dispose()
  })

  return {
    container,
    scene,
    camera,
    renderer,
    currentFloorPlanId,
    currentStyleId,
    selectedFurniture,
    isFirstPersonMode,
    initScene,
    switchFloorPlan,
    updateStyleMaterials,
    clearSelectedFurniture,
    enterFirstPersonMode,
    exitFirstPersonMode
  }
}
