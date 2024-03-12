<script setup lang="ts">
import transcript from '~/utils/slugTranscript'

const slug = defineModel<string | undefined>({ required: true })
const props = defineProps<{ value: string | undefined }>()
watch(
  () => props.value,
  () => (slug.value = transcript(props.value || ''))
)
</script>

<template>
  <UFormGroup label="Slug" class="w-full" required name="slug">
    <UInput v-model="slug" />
  </UFormGroup>
</template>
