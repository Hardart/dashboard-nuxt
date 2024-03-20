<script lang="ts" setup>
const editor = inject<any>('tiptap')
const src = defineModel<string>({ required: true })
const insertImage = (url: string) => {
  editor.value?.chain().focus().setImage({ src: src.value, title: 'IMAGE', desc: 'jfaff' }).run()
}
</script>
<template>
  <UiUploadImage
    v-model="src"
    :apply="insertImage"
    :btn="{ variant: 'outline', icon: 'i-material-symbols-add-photo-alternate-outline-rounded', color: 'gray', class: 'editor__button' }"
  />
</template>
