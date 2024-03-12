<script lang="ts" setup>
const formatItems = [
  { label: 'Paragraph' },
  { label: 'Heading 1', level: 1 },
  { label: 'Heading 2', level: 2 },
  { label: 'Heading 3', level: 3 },
  { label: 'Heading 4', level: 4 },
]
const selected = ref(formatItems[0])
const editor = inject<any>('tiptap')
watch(selected, () => {
  if (selected.value.label === 'Paragraph') editor.value?.chain().focus().setParagraph().run()
  else if (typeof selected.value.level !== 'undefined') {
    const level = selected.value.level
    editor.value?.chain().focus().toggleHeading({ level }).run()
  }
})
</script>
<template>
  <USelectMenu placeholder="text formatting" v-model="selected" :options="formatItems" option-attribute="label" class="w-32" size="md" />
</template>
