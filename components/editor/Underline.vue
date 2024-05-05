<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="material-symbols:format-underlined-rounded"
    class="editor__button"
    @click="editor.chain().focus().toggleUnderline().run()"
    :class="{ active: editor.isActive('underline') }"
  />
</template>
