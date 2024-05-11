<script setup lang="ts">
import type { ImageName } from '~/types'

const src = defineModel({ required: true })
defineProps<{
  name: ImageName
  container?: { class?: string }
}>()
</script>

<template>
  <UTooltip text="Выбрать" :openDelay="0" :closeDelay="0">
    <UPopover v-bind="{ ...container, ...$attrs }">
      <UButton
        variant="ghost"
        color="gray"
        icon="i-material-symbols-image-search-rounded"
        class="border border-zinc-500 bg-zinc-700/40"
      />
      <template #panel="{ close }">
        <UiImagesPanel v-model="src" @close="close" :name />
      </template>
    </UPopover>
  </UTooltip>
</template>
