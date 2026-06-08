<script setup lang="ts">
import { X, Ruler, Layers, Box } from 'lucide-vue-next'
import type { FurnitureConfig } from '../types'

interface Props {
  furniture: FurnitureConfig | null
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const furnitureTypeNames: Record<string, string> = {
  sofa: '沙发',
  bed: '床',
  table: '茶几/桌子',
  cabinet: '橱柜',
  wardrobe: '衣柜',
  tv: '电视柜',
  chair: '椅子',
  dining_chair: '餐椅',
  bedside_table: '床头柜'
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 translate-x-8"
    leave-to-class="opacity-0 translate-x-8"
  >
    <div
      v-if="furniture"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[420px]"
    >
      <div class="bg-[#1a2332]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div class="relative p-6">
          <button
            @click="emit('close')"
            class="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
          >
            <X class="w-4 h-4" />
          </button>

          <div class="flex gap-4">
            <div
              class="w-24 h-24 rounded-xl flex-shrink-0 shadow-inner flex items-center justify-center"
              :style="{ backgroundColor: furniture.color }"
            >
              <Box class="w-10 h-10 text-white/80" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="inline-flex px-2.5 py-1 rounded-full bg-[#d4a853]/20 text-[#d4a853] text-xs font-medium mb-2">
                {{ furnitureTypeNames[furniture.type] || furniture.type }}
              </div>
              <h3
                class="text-white font-bold text-xl mb-1"
                style="font-family: 'Noto Serif SC', serif;"
              >
                {{ furniture.name }}
              </h3>
              <p class="text-white/60 text-sm leading-relaxed">
                {{ furniture.description }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-5">
            <div class="p-3 rounded-xl bg-white/[0.04] border border-white/5">
              <div class="flex items-center gap-2 text-[#d4a853] mb-1">
                <Ruler class="w-4 h-4" />
                <span class="text-xs font-medium">尺寸规格</span>
              </div>
              <p class="text-white/80 text-sm font-mono">{{ furniture.dimensions }}</p>
            </div>

            <div class="p-3 rounded-xl bg-white/[0.04] border border-white/5">
              <div class="flex items-center gap-2 text-[#d4a853] mb-1">
                <Layers class="w-4 h-4" />
                <span class="text-xs font-medium">材质工艺</span>
              </div>
              <p class="text-white/80 text-sm">{{ furniture.material }}</p>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-md border border-white/20"
                :style="{ backgroundColor: furniture.color }"
              />
              <span class="text-white/50 text-sm">参考配色</span>
            </div>
            <span class="text-white/40 text-xs font-mono">{{ furniture.color.toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
