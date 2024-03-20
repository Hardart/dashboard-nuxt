<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-format-bold-rounded"
    class="editor__button"
    @click="editor.chain().focus().toggleBold().run()"
    :class="{ active: editor.isActive('bold') }"
  />
</template>
