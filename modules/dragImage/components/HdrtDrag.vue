<script setup lang="ts">
import DragImageClass from '../utils/Image'

const { src } = defineProps<{ src: string }>()
const panElement = ref<HTMLElement | undefined>(undefined)
const drag = new DragImageClass(src, panElement)

const { imageStyle, panStyle, zoomValue, crop, imageRect } = drag.props
useHead({ htmlAttrs: { style: 'touch-action: none' } })
defineEmits(['on-confirm'])
</script>

<template>
  <div class="mx-auto h-96 w-1/3 bg-zinc-300">
    <div class="relative mx-auto grid h-96 w-full place-items-center overflow-hidden">
      <img class="absolute select-none" @dragstart.prevent :src :style="imageStyle" />
      <div ref="panElement" class="shadow-hdrt absolute cursor-default" :style="panStyle"></div>
    </div>
    <div class="p-6 md:mx-10 lg:mx-14">
      <URange v-model="zoomValue" :min="0" :max="1000" />
    </div>
    <div>
      <UButton label="Отправить" block @click="$emit('on-confirm', { ...imageRect, crop })" />
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
