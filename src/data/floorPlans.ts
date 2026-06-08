import type { FloorPlan } from '../types'

export const floorPlans: FloorPlan[] = [
  {
    id: 'two-room',
    name: '两室一厅',
    description: '约85㎡ 经典户型',
    totalArea: 85,
    rooms: [
      {
        id: 'living-2',
        type: 'living',
        name: '客厅',
        position: { x: 0, y: 0, z: 0 },
        size: { width: 6, depth: 5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: 0, y: 1.4, z: -2.45 }
      },
      {
        id: 'bedroom-2-1',
        type: 'bedroom',
        name: '主卧',
        position: { x: -4.5, y: 0, z: 0 },
        size: { width: 3.5, depth: 4, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: -4.5, y: 1.4, z: -1.95 }
      },
      {
        id: 'bedroom-2-2',
        type: 'bedroom',
        name: '次卧',
        position: { x: 4.5, y: 0, z: -1 },
        size: { width: 3, depth: 3.5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: 4.5, y: 1.4, z: -2.7 }
      },
      {
        id: 'kitchen-2',
        type: 'kitchen',
        name: '厨房',
        position: { x: 4.5, y: 0, z: 2.5 },
        size: { width: 3, depth: 2, height: 2.8 }
      },
      {
        id: 'bathroom-2',
        type: 'bathroom',
        name: '卫生间',
        position: { x: 0, y: 0, z: 3.5 },
        size: { width: 2.5, depth: 2, height: 2.8 }
      }
    ]
  },
  {
    id: 'three-room',
    name: '三室一厅',
    description: '约115㎡ 舒适户型',
    totalArea: 115,
    rooms: [
      {
        id: 'living-3',
        type: 'living',
        name: '客厅',
        position: { x: 0, y: 0, z: 0 },
        size: { width: 7, depth: 5.5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: 0, y: 1.4, z: -2.7 }
      },
      {
        id: 'bedroom-3-1',
        type: 'bedroom',
        name: '主卧',
        position: { x: -5.5, y: 0, z: 0 },
        size: { width: 4, depth: 4.5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: -5.5, y: 1.4, z: -2.2 }
      },
      {
        id: 'bedroom-3-2',
        type: 'bedroom',
        name: '次卧',
        position: { x: 5.5, y: 0, z: -1 },
        size: { width: 3.5, depth: 3.5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: 5.5, y: 1.4, z: -2.7 }
      },
      {
        id: 'bedroom-3-3',
        type: 'bedroom',
        name: '书房',
        position: { x: 5.5, y: 0, z: 3 },
        size: { width: 3.5, depth: 2.5, height: 2.8 },
        hasWindow: true,
        windowPosition: { x: 5.5, y: 1.4, z: 4.2 }
      },
      {
        id: 'kitchen-3',
        type: 'kitchen',
        name: '厨房',
        position: { x: 0, y: 0, z: 4.5 },
        size: { width: 3.5, depth: 2, height: 2.8 }
      },
      {
        id: 'bathroom-3',
        type: 'bathroom',
        name: '卫生间',
        position: { x: -3, y: 0, z: 4.5 },
        size: { width: 2, depth: 2, height: 2.8 }
      }
    ]
  }
]
