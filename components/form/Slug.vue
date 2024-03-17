<script setup lang="ts">
import transcript from '~/utils/slugTranscript'

const slug = defineModel<string | undefined>({ required: true })
const props = defineProps<{ input: string | undefined }>()
watch(
  () => props.input,
  () => (slug.value = transcript(props.input || ''))
)
</script>

<template>
  <UFormGroup label="Транскрипция" class="w-full" required name="slug">
    <UInput v-model="slug" />
  </UFormGroup>
</template>
