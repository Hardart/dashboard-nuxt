<script setup lang="ts">
const [openImage, toggle] = useToggle()
const content = defineModel<string>()

const editor = useEditor({
  content: content.value,
  extensions: [TiptapStarterKit],
  editorProps: {
    attributes: {
      class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none',
    },
  },
  onUpdate: () => (content.value = editor.value?.getHTML() || ''),
})

provide('tiptap', editor)
</script>

<template>
  <div v-if="editor" class="flex gap-x-3 mb-5">
    <EditorHeading />
    <EditorBlockquote />
    <EditorImage />
  </div>
  <UFormGroup label="Текст новости" name="content" required>
    <TiptapEditorContent
      :editor="editor"
      class="bg-white dark:bg-slate-900 border dark:border-slate-600 rounded-lg max-h-[400px] overflow-y-auto"
    />
  </UFormGroup>
</template>

<style>
.editor__button {
  @apply size-9 rounded-md border bg-neutral-50 dark:bg-slate-900 dark:border-slate-600
        hover:border-neutral-300 dark:hover:border-slate-600 dark:active:bg-slate-700;
}

.editor__button.active {
  @apply dark:bg-slate-800 dark:active:bg-slate-700;
}
</style>
