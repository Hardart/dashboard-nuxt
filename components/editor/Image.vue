<script lang="ts" setup>
const editor = inject<any>('tiptap')
const src = defineModel({ required: true })
const onSetURL = (closeHandle: () => void) => {
  // editor.value?.chain().focus().setImage({ src: src.value }).run()
  closeHandle()
}
</script>
<template></template>

<!-- <UPopover>
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
</UPopover> -->
