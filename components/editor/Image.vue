<script lang="ts" setup>
const editor = inject<any>('tiptap')
const src = ref('')
const onSetURL = (closeHandle: () => void) => {
  // editor.value?.chain().focus().setImage({ src: src.value }).run()
  closeHandle()
}
</script>
<template>
  <UPopover>
    <UButton square variant="outline" color="gray" icon="i-material-symbols-add-photo-alternate-outline" class="editor__button" />
    <template #panel="{ close }">
      <div class="py-4 px-8 space-y-4 text-right">
        <UFormGroup label="Ссылка на картинку">
          <UInput v-model="src" />
        </UFormGroup>
        <div class="flex justify-end gap-x-4">
          <UButton color="red" variant="outline" size="xs" label="Отменить" @click="close" />
          <UButton color="emerald" variant="outline" size="xs" label="Применить" @click="onSetURL(close)" />
        </div>
      </div>
    </template>
  </UPopover>
</template>
