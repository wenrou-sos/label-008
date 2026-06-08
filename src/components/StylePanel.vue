<script setup lang="ts">
import { computed } from 'vue'
import { Palette, Check } from 'lucide-vue-next'
import { designStyles } from '../data/styles'
import type { StyleId } from '../types'

interface Props {
  currentStyleId: StyleId
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change-style', id: StyleId): void
}>()

const styles = computed(() => designStyles)
</script>

<template>
  <div class="fixed top-20 right-4 z-40 w-72">
    <div class="bg-[#1a2332]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div class="p-5 border-b border-white/10">
        <div class="flex items-center gap-3 mb-1">
          <div class="w-8 h-8 rounded-lg bg-[#d4a853]/20 flex items-center justify-center">
            <Palette class="w-4 h-4 text-[#d4a853]" />
          </div>
          <h2 class="text-white font-bold text-lg" style="font-family: 'Noto Serif SC', serif;">
            装修风格
          </h2>
        </div>
        <p class="text-white/50 text-sm ml-11">选择您喜欢的设计风格</p>
      </div>

      <div class="p-3 space-y-2">
        <button
          v-for="style in styles"
          :key="style.id"
          @click="emit('change-style', style.id)"
          :class="[
            'w-full group relative p-4 rounded-xl text-left transition-all duration-300 border-2',
            props.currentStyleId === style.id
              ? 'bg-white/10 border-[#d4a853] shadow-lg shadow-[#d4a853]/20'
              : 'bg-white/[0.02] border-transparent hover:bg-white/5 hover:border-white/10'
          ]"
        >
          <div class="flex items-start gap-3">
            <div
              class="relative w-14 h-14 rounded-xl flex-shrink-0 shadow-inner overflow-hidden"
              :style="{ backgroundColor: style.previewColor }"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <div
                v-if="props.currentStyleId === style.id"
                class="absolute inset-0 bg-[#d4a853]/30 flex items-center justify-center"
              >
                <div class="w-6 h-6 rounded-full bg-[#d4a853] flex items-center justify-center">
                  <Check class="w-4 h-4 text-[#1a2332]" stroke-width="3" />
                </div>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h3
                  class="font-bold text-base transition-colors duration-300"
                  :class="props.currentStyleId === style.id ? 'text-[#d4a853]' : 'text-white'"
                  style="font-family: 'Noto Serif SC', serif;"
                >
                  {{ style.name }}
                </h3>
              </div>
              <p class="text-white/50 text-xs leading-relaxed line-clamp-2">
                {{ style.description }}
              </p>
            </div>
          </div>

          <div
            v-if="props.currentStyleId === style.id"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#d4a853] rounded-r-full"
          />
        </button>
      </div>

      <div class="p-4 border-t border-white/10 bg-white/[0.02]">
        <div class="flex items-center justify-between text-xs text-white/40">
          <span>实时预览效果</span>
          <div class="flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>3D 渲染中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
