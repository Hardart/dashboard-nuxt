<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-format-image-right-rounded"
    class="editor__button"
    @click="editor.chain().focus().updateAttributes('image', { class: 'w-72 float-right not-prose mr-4' }).run()"
  />
</template>
