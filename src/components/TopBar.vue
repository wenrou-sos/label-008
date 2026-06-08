<script setup lang="ts">
import { computed } from 'vue'
import { Home, Building2, HelpCircle } from 'lucide-vue-next'
import { floorPlans } from '../data/floorPlans'

interface Props {
  currentPlanId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change-plan', id: string): void
}>()

const plans = computed(() => floorPlans)
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-[#1a2332]/90 backdrop-blur-md border-b border-white/10">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#b8942d] flex items-center justify-center shadow-lg">
        <Home class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-white text-lg font-bold tracking-wide" style="font-family: 'Noto Serif SC', serif;">
          雅居空间
        </h1>
        <p class="text-white/50 text-xs">3D装修方案展示</p>
      </div>
    </div>

    <div class="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
      <button
        v-for="plan in plans"
        :key="plan.id"
        @click="emit('change-plan', plan.id)"
        :class="[
          'relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2',
          props.currentPlanId === plan.id
            ? 'bg-[#d4a853] text-[#1a2332] shadow-lg shadow-[#d4a853]/30'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        ]"
      >
        <Building2 class="w-4 h-4" />
        <span>{{ plan.name }}</span>
        <span
          v-if="props.currentPlanId === plan.id"
          class="text-xs opacity-80 ml-1"
        >
          {{ plan.description }}
        </span>
      </button>
    </div>

    <div class="flex items-center gap-3">
      <button class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300">
        <HelpCircle class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
