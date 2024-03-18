<script setup lang="ts">
import CustomImage from '~/utils/tiptap-extensions/image'
const content = defineModel<string | undefined>({ required: true })

const editor = useEditor({
  content: content.value,
  extensions: [TiptapStarterKit, CustomImage],
  editorProps: {
    attributes: {
      class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none',
    },
  },
  onUpdate: () => (content.value = editor.value?.getText().trim() ? editor.value?.getHTML() : editor.value?.getText().trim()),
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
      class="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg min-h-[400px] max-h-[400px] overflow-y-auto cursor-text"
      @click="editor?.commands.focus()"
    />
  </UFormGroup>
</template>

<style>
.editor__button {
  @apply size-9 grid place-items-center rounded-md  bg-white dark:bg-zinc-900 ring-zinc-600/30 dark:ring-zinc-600/80
        hover:border-neutral-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-700;
}

.editor__button.active {
  @apply dark:bg-zinc-800 dark:active:bg-zinc-700;
}
</style>
