<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-format-quote-rounded"
    class="editor__button"
    @click="editor.chain().focus().toggleBlockquote().run()"
    :class="{ active: editor.isActive('blockquote') }"
  />
</template>
