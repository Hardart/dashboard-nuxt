<script setup lang="ts">
defineProps<{
  options: string[]
}>()
const vModel = defineModel<string>({ required: true })
</script>

<template>
  <UFormGroup>
    <USelectMenu
      class="w-16"
      size="2xs"
      :options
      v-model="vModel"
      :uiMenu="{ option: { selected: 'pe-1', selectedIcon: { base: 'size-3', padding: 'pe-1' }, size: 'text-xs' } }"
    />
  </UFormGroup>
</template>
