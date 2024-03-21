<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-format-italic-rounded"
    class="editor__button"
    @click="editor.chain().focus().toggleItalic().run()"
    :class="{ active: editor.isActive('italic') }"
  />
</template>
