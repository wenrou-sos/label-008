import type { DesignStyle, FurnitureConfig } from '../types'

const modernFurniture: FurnitureConfig[] = [
  {
    id: 'modern-sofa',
    name: '现代布艺沙发',
    type: 'sofa',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.4, height: 0.8, depth: 0.9 },
    color: '#4a5568',
    material: '高密度棉麻布艺 + 实木框架',
    dimensions: '2400 × 900 × 800mm',
    description: '简约设计，线条流畅，舒适坐感'
  },
  {
    id: 'modern-tv',
    name: '极简电视柜组合',
    type: 'tv',
    roomId: 'living-2',
    position: { x: 0, y: 0.4, z: -1.8 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.0, height: 0.5, depth: 0.35 },
    color: '#2d3748',
    material: '哑光烤漆面板 + 钢化玻璃',
    dimensions: '2000 × 350 × 500mm',
    description: '一体化设计，储物空间充足'
  },
  {
    id: 'modern-table',
    name: '岩板茶几',
    type: 'table',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: -0.2 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 1.2, height: 0.4, depth: 0.6 },
    color: '#1a202c',
    material: '进口岩板台面 + 金属支架',
    dimensions: '1200 × 600 × 400mm',
    description: '耐高温，易清洁，现代感十足'
  },
  {
    id: 'modern-bed',
    name: '现代简约双人床',
    type: 'bed',
    roomId: 'bedroom-2-1',
    position: { x: -4.5, y: 0, z: -0.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    size: { width: 1.8, height: 0.45, depth: 2.0 },
    color: '#718096',
    material: '科技布面料 + 实木排骨架',
    dimensions: '1800 × 2000 × 450mm',
    description: '人体工学设计，舒适支撑'
  },
  {
    id: 'modern-wardrobe',
    name: '定制衣柜',
    type: 'wardrobe',
    roomId: 'bedroom-2-1',
    position: { x: -2.9, y: 0, z: 1 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    size: { width: 2.0, height: 2.4, depth: 0.6 },
    color: '#4a5568',
    material: 'E0级环保板材 + 阻尼铰链',
    dimensions: '2000 × 2400 × 600mm',
    description: '大容量分区储物，静音设计'
  },
  {
    id: 'modern-cabinet',
    name: '整体橱柜',
    type: 'cabinet',
    roomId: 'kitchen-2',
    position: { x: 4.5, y: 0, z: 2.5 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.5, height: 0.9, depth: 0.6 },
    color: '#2d3748',
    material: '石英石台面 + 双饰面门板',
    dimensions: '2500 × 600 × 900mm',
    description: 'L型布局，操作流畅'
  }
]

const nordicFurniture: FurnitureConfig[] = [
  {
    id: 'nordic-sofa',
    name: '北欧原木三人沙发',
    type: 'sofa',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.2, height: 0.75, depth: 0.85 },
    color: '#f7fafc',
    material: '水洗棉麻 + 白橡木框架',
    dimensions: '2200 × 850 × 750mm',
    description: '自然质朴，温馨舒适'
  },
  {
    id: 'nordic-tv',
    name: '北欧实木电视柜',
    type: 'tv',
    roomId: 'living-2',
    position: { x: 0, y: 0.4, z: -1.8 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 1.8, height: 0.45, depth: 0.4 },
    color: '#e2e8f0',
    material: '北美白橡木 + 木蜡油涂装',
    dimensions: '1800 × 400 × 450mm',
    description: '简约自然，环保材质'
  },
  {
    id: 'nordic-table',
    name: '原木小圆几',
    type: 'table',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: -0.2 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 0.9, height: 0.45, depth: 0.9 },
    color: '#edf2f7',
    material: '白橡木整木桌面 + 金属支腿',
    dimensions: 'Ø900 × 450mm',
    description: '圆润造型，安全美观'
  },
  {
    id: 'nordic-bed',
    name: '北欧实木床架',
    type: 'bed',
    roomId: 'bedroom-2-1',
    position: { x: -4.5, y: 0, z: -0.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    size: { width: 1.8, height: 0.4, depth: 2.0 },
    color: '#fafafa',
    material: '俄罗斯樟子松 + 实木排骨架',
    dimensions: '1800 × 2000 × 400mm',
    description: '原木纹理，自然清香'
  },
  {
    id: 'nordic-wardrobe',
    name: '原木双门衣柜',
    type: 'wardrobe',
    roomId: 'bedroom-2-1',
    position: { x: -2.9, y: 0, z: 1 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    size: { width: 1.8, height: 2.2, depth: 0.6 },
    color: '#e2e8f0',
    material: '松木指接板 + 环保水性漆',
    dimensions: '1800 × 2200 × 600mm',
    description: '简洁实用，清新自然'
  },
  {
    id: 'nordic-cabinet',
    name: '北欧简约橱柜',
    type: 'cabinet',
    roomId: 'kitchen-2',
    position: { x: 4.5, y: 0, z: 2.5 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.4, height: 0.85, depth: 0.6 },
    color: '#f7fafc',
    material: '防火板台面 + 白色哑光门板',
    dimensions: '2400 × 600 × 850mm',
    description: '清新明亮，操作便捷'
  }
]

const chineseFurniture: FurnitureConfig[] = [
  {
    id: 'chinese-sofa',
    name: '新中式实木沙发',
    type: 'sofa',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.4, height: 0.9, depth: 0.95 },
    color: '#5c3317',
    material: '非洲花梨木 + 真丝靠包',
    dimensions: '2400 × 950 × 900mm',
    description: '榫卯工艺，典雅大气'
  },
  {
    id: 'chinese-tv',
    name: '中式雕花电视柜',
    type: 'tv',
    roomId: 'living-2',
    position: { x: 0, y: 0.4, z: -1.8 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.2, height: 0.55, depth: 0.45 },
    color: '#744210',
    material: '胡桃木 + 传统铜饰配件',
    dimensions: '2200 × 450 × 550mm',
    description: '手工雕刻，东方韵味'
  },
  {
    id: 'chinese-table',
    name: '红木方茶几',
    type: 'table',
    roomId: 'living-2',
    position: { x: 0, y: 0.2, z: -0.2 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 1.1, height: 0.5, depth: 0.65 },
    color: '#7b341e',
    material: '大红酸枝木 + 生漆工艺',
    dimensions: '1100 × 650 × 500mm',
    description: '方正稳重，传世收藏'
  },
  {
    id: 'chinese-bed',
    name: '新中式架子床',
    type: 'bed',
    roomId: 'bedroom-2-1',
    position: { x: -4.5, y: 0, z: -0.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    size: { width: 1.8, height: 0.5, depth: 2.1 },
    color: '#744210',
    material: '缅甸花梨木 + 刺绣床品',
    dimensions: '1800 × 2100 × 500mm',
    description: '古典造型，舒适安眠'
  },
  {
    id: 'chinese-wardrobe',
    name: '中式顶箱柜',
    type: 'wardrobe',
    roomId: 'bedroom-2-1',
    position: { x: -2.9, y: 0, z: 1 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    size: { width: 2.2, height: 2.6, depth: 0.65 },
    color: '#5c3317',
    material: '老榆木 + 黄铜拉手',
    dimensions: '2200 × 2600 × 650mm',
    description: '大容量储物，镇宅之宝'
  },
  {
    id: 'chinese-cabinet',
    name: '中式整体橱柜',
    type: 'cabinet',
    roomId: 'kitchen-2',
    position: { x: 4.5, y: 0, z: 2.5 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { width: 2.6, height: 0.9, depth: 0.65 },
    color: '#744210',
    material: '实木门板 + 石英石台面',
    dimensions: '2600 × 650 × 900mm',
    description: '古典与现代的完美融合'
  }
]

export const designStyles: DesignStyle[] = [
  {
    id: 'modern',
    name: '现代简约',
    description: '简洁利落的线条，高级灰与深色的搭配，营造时尚大气的都市生活空间',
    previewColor: '#4a5568',
    materials: {
      wall: { color: '#e8e4df', roughness: 0.9 },
      floor: { color: '#8b7355', roughness: 0.6 },
      ceiling: { color: '#ffffff' },
      door: { color: '#2d3748' },
      windowFrame: { color: '#1a202c' }
    },
    furniture: modernFurniture
  },
  {
    id: 'nordic',
    name: '北欧风',
    description: '原木色调与纯净白色为主，清新自然，带来温馨舒适的居家感受',
    previewColor: '#a0aec0',
    materials: {
      wall: { color: '#f5f0e8', roughness: 0.95 },
      floor: { color: '#d4b896', roughness: 0.5 },
      ceiling: { color: '#ffffff' },
      door: { color: '#e2e8f0' },
      windowFrame: { color: '#ffffff' }
    },
    furniture: nordicFurniture
  },
  {
    id: 'chinese',
    name: '新中式',
    description: '传统东方美学与现代生活方式结合，红木色调，典雅大气的文化韵味',
    previewColor: '#744210',
    materials: {
      wall: { color: '#f0e6d3', roughness: 0.9 },
      floor: { color: '#5c3317', roughness: 0.7 },
      ceiling: { color: '#faf5eb' },
      door: { color: '#5c3317' },
      windowFrame: { color: '#744210' }
    },
    furniture: chineseFurniture
  }
]
