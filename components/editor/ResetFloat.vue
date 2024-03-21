<script lang="ts" setup>
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-im"
    class="editor__button"
    @click="editor.chain().focus().resetAttributes('image', ['class']).run()"
  />
</template>
