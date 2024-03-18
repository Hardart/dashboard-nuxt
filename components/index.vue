<script lang="ts" setup>
import Image from "@/utils/tiptap-extensions/image"
const content = ref("Hello editor")
const image = reactive({
  src: "https://www.diera.ru/blog/content/images/2022/11/nuxt3-logo-dark.png",
  description: "",
  apply() {
    editor.value?.chain().focus().setImage({ src: image.src, title: "IMAGE", desc: image.description }).run()
    editor.value?.commands.enter()
    editor.value?.commands.focus("end")
  },
})
const editor = useEditor({
  content: content.value,
  extensions: [
    TiptapDocument,
    TiptapText,
    TiptapHeading,
    TiptapListItem,
    TiptapBulletList,
    TiptapParagraph,
    TiptapHardBreak,
    Image,
  ],
  editorProps: {
    attributes: {
      class: "min-h-96 max-h-96 p-4 m-8 border rounded-xl overflow-y-auto",
    },
  },
  onUpdate: () => (content.value = editor.value?.getHTML() || ""),
})
</script>

<template>
  <UContainer>
    <div v-if="editor" class="flex gap-x-5 bg-slate-200">
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        P
      </button>
      <UPopover>
        <UButton color="white" label="Img" />

        <template #panel="{ close }">
          <div class="space-y-3 px-8 py-5">
            <UInput v-model="image.src" placeholder="URL изображения" />
            <UInput v-model="image.description" placeholder="Подпись к картинке" />
            <div class="flex justify-end gap-x-2">
              <UButton size="xs" color="red" label="Отменить" @click="close" />
              <UButton size="xs" label="Вставить" @click="image.apply" />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <TiptapEditorContent :editor="editor" />
    <pre class="whitespace-pre-wrap">{{ content }}</pre>
  </UContainer>
</template>

<style scoped></style>
