<script setup lang="ts">
const { src } = defineProps<{ src: string }>()
const panArea = ref<HTMLElement | null>(null)
const { preloadImageSource, imageStyle, panStyle, zoomValue, imageRect } = useDrag(panArea, src)
useHead({ htmlAttrs: { style: 'touch-action: none' } })
defineEmits(['on-confirm'])
</script>

<template>
  <div class="mx-auto w-1/3">
    <div class="relative mx-auto grid h-96 w-full place-items-center overflow-hidden">
      <img class="absolute select-none" @dragstart.prevent :src="preloadImageSource" :style="imageStyle" />
      <div ref="panArea" class="shadow-hdrt absolute" :style="panStyle"></div>
    </div>
    <div class="p-6 md:mx-10 lg:mx-14">
      <URange v-model="zoomValue" min="0" max="1000" />
    </div>
    <div>
      <UButton label="Отправить" block @click="$emit('on-confirm', { ...imageRect, crop: panArea?.clientWidth })" />
    </div>
  </div>
</template>

<style>
.shadow-hdrt {
  box-shadow: rgba(47, 49, 54, 0.7) 0 0 0 9999px;
}

/* input[type='range'] {
  --slider-value: v-bind(zoomValue);
  background-size: calc(var(--slider-value) * 0.1%) 100%;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 22px;
  width: 18px;
  border-radius: 20%;
  cursor: ew-resize;
} */
</style>
