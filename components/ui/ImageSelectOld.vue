<script setup lang="ts">
import type { Button } from '#ui/types'
import type { ImageName } from '~/types'
const src = defineModel({ required: true })
defineProps<{
  container?: { class?: string }
  btn?: Button & { class?: string }
  name: ImageName
}>()
</script>

<template>
  <UPopover v-bind="{ ...container, ...$attrs }">
    <UButton v-bind="{ ...btn, ...$attrs }" />
    <template #panel="{ close }">
      <UiImagesPanel v-model="src" @close="close" :name />
    </template>
  </UPopover>
</template>
