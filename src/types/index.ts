export interface Vec3 {
  x: number
  y: number
  z: number
}

export type RoomType = 'living' | 'bedroom' | 'kitchen' | 'bathroom'

export interface Room {
  id: string
  type: RoomType
  name: string
  position: Vec3
  size: { width: number; depth: number; height: number }
  hasWindow?: boolean
  windowPosition?: Vec3
}

export interface FloorPlan {
  id: string
  name: string
  description: string
  rooms: Room[]
  totalArea: number
}

export type FurnitureType = 'sofa' | 'bed' | 'table' | 'cabinet' | 'chair' | 'tv' | 'bedside_table' | 'wardrobe' | 'dining_chair'

export interface FurnitureConfig {
  id: string
  name: string
  type: FurnitureType
  roomId: string
  position: Vec3
  rotation: Vec3
  size: { width: number; height: number; depth: number }
  color: string
  material: string
  dimensions: string
  description: string
}

export type StyleId = 'modern' | 'nordic' | 'chinese'

export interface StyleMaterials {
  wall: { color: string; roughness?: number }
  floor: { color: string; roughness?: number; metalness?: number }
  ceiling: { color: string }
  door: { color: string }
  windowFrame: { color: string }
}

export interface DesignStyle {
  id: StyleId
  name: string
  description: string
  previewColor: string
  materials: StyleMaterials
  furniture: FurnitureConfig[]
}

export interface AppState {
  currentFloorPlan: string
  currentStyle: StyleId
  selectedFurniture: FurnitureConfig | null
  isFirstPersonMode: boolean
}
