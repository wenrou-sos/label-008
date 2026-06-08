<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TopBar from '../components/TopBar.vue'
import StylePanel from '../components/StylePanel.vue'
import FurnitureCard from '../components/FurnitureCard.vue'
import ControlHint from '../components/ControlHint.vue'
import { useThreeScene } from '../composables/useThreeScene'
import type { StyleId } from '../types'

const canvasContainer = ref<HTMLElement | null>(null)

const {
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
} = useThreeScene()

function handleChangePlan(id: string) {
  switchFloorPlan(id)
}

function handleChangeStyle(id: StyleId) {
  updateStyleMaterials(id)
}

onMounted(() => {
  if (canvasContainer.value) {
    initScene(canvasContainer.value)
  }
})

void exitFirstPersonMode
</script>

<template>
  <div class="relative w-full h-full bg-[#1a2332] overflow-hidden">
    <div
      ref="canvasContainer"
      class="absolute inset-0 w-full h-full"
    />

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    <TopBar
      :current-plan-id="currentFloorPlanId"
      @change-plan="handleChangePlan"
    />

    <StylePanel
      :current-style-id="currentStyleId"
      @change-style="handleChangeStyle"
    />

    <ControlHint
      :is-first-person-mode="isFirstPersonMode"
      @enter-first-person="enterFirstPersonMode"
    />

    <FurnitureCard
      :furniture="selectedFurniture"
      @close="clearSelectedFurniture"
    />

    <Transition
      enter-active-class="transition-opacity duration-500"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isFirstPersonMode"
        class="fixed inset-0 pointer-events-none flex items-center justify-center z-30"
      >
        <div class="relative">
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 absolute -left-0.75 -top-0.75" />
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 absolute -left-0.75 top-0.75" />
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 absolute left-0.75 -top-0.75" />
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 absolute left-0.75 top-0.75" />
        </div>
      </div>
    </Transition>
  </div>
</template>
