<script setup lang="ts">
import type { Button } from '#ui/types'
const src = defineModel({ required: true })
defineProps<{
  container?: { class?: string }
  btn?: Button & { class?: string }
}>()
</script>

<template>
  <UPopover v-bind="{ ...container, ...$attrs }">
    <UButton color="gray" v-bind="{ ...btn, ...$attrs }" />
    <template #panel="{ close }">
      <UiImagesPanel v-model="src" @close="close" />
    </template>
  </UPopover>
</template>

<style></style>
