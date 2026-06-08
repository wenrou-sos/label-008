<script setup lang="ts">
import { Keyboard, Mouse, Eye } from 'lucide-vue-next'

interface Props {
  isFirstPersonMode: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'enter-first-person'): void
}>()
</script>

<template>
  <div class="fixed bottom-6 left-6 z-40">
    <div class="bg-[#1a2332]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 w-64">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-7 h-7 rounded-lg bg-[#d4a853]/20 flex items-center justify-center">
          <Keyboard class="w-4 h-4 text-[#d4a853]" />
        </div>
        <h4 class="text-white font-bold text-sm" style="font-family: 'Noto Serif SC', serif;">
          操作提示
        </h4>
      </div>

      <div class="space-y-2.5">
        <div class="flex items-center gap-3">
          <div class="flex gap-1">
            <kbd class="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">W</kbd>
            <kbd class="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">A</kbd>
            <kbd class="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">S</kbd>
            <kbd class="w-6 h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">D</kbd>
          </div>
          <span class="text-white/60 text-xs">漫游走动</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-[112px] flex items-center justify-center">
            <Mouse class="w-5 h-5 text-white/70" />
          </div>
          <span class="text-white/60 text-xs">
            {{ isFirstPersonMode ? '鼠标控制视角' : '拖拽旋转视角 / 滚轮缩放' }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <kbd class="w-[112px] h-6 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-mono">ESC</kbd>
          <span class="text-white/60 text-xs">退出漫游模式</span>
        </div>
      </div>

      <button
        v-if="!isFirstPersonMode"
        @click="emit('enter-first-person')"
        class="w-full mt-4 py-2.5 rounded-xl bg-[#d4a853] hover:bg-[#c49a3d] text-[#1a2332] font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#d4a853]/25 hover:shadow-[#d4a853]/40"
      >
        <Eye class="w-4 h-4" />
        进入沉浸式漫游
      </button>

      <div
        v-if="isFirstPersonMode"
        class="mt-4 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-center text-sm font-medium flex items-center justify-center gap-2"
      >
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        漫游模式已开启
      </div>
    </div>
  </div>
</template>
