<script setup lang="ts">
import { Image } from '~/utils/tiptap/Image'
import Underline from '@tiptap/extension-underline'
const content = defineModel<string | undefined>({ required: true })

const image = reactive({
  src: '',
  description: ''
})

watch(
  () => image.src,
  () => {
    editor.value
      ?.chain()
      .focus()
      .setImage({ src: correctImageSrc(image.src) })
      .run()
  }
)

const editor = useEditor({
  content: parseHtml(content.value!),
  extensions: [TiptapStarterKit, Underline, Image],
  editorProps: {
    attributes: {
      class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none'
    }
  },
  onUpdate() {
    content.value = editor.value?.getText().trim() ? editor.value?.getHTML() : editor.value?.getText().trim()
  }
})

provide('tiptap', editor)
</script>

<template>
  <div v-if="editor" class="mb-5 flex gap-x-3">
    <EditorHeading />
    <EditorBold />
    <EditorUnderline />
    <EditorItalic />
    <EditorBlockquote />
    <EditorFloatLeft />
    <EditorFloatRight />
    <EditorResetFloat />
    <EditorUploadImage v-model="image.src" />
    <EditorSelectImage v-model="image.src" />
  </div>
  <UFormGroup label="Текст новости" name="content" required>
    <TiptapEditorContent
      :editor="editor"
      class="max-h-[450px] min-h-[450px] cursor-text overflow-y-auto rounded-lg border bg-white dark:border-zinc-700 dark:bg-zinc-800"
      @click="editor?.commands.focus()"
    />
  </UFormGroup>
</template>

<style>
.editor__button {
  @apply grid size-9 place-items-center rounded-md  bg-white ring-zinc-600/30 hover:border-neutral-300 dark:bg-zinc-900
        dark:ring-zinc-600/80 dark:hover:bg-zinc-800 dark:active:bg-zinc-700;
}

.editor__button.active {
  @apply dark:bg-zinc-800 dark:active:bg-zinc-700;
}

img.ProseMirror-selectednode {
  @apply outline outline-2 outline-offset-4 outline-zinc-300/70;
}
</style>
