<script setup lang="ts">
import { galleryAPI } from '~/api/gallery-api'
import type { Slide } from '~/scheme/z_slide'
const [isOpen, toggleOpen] = useToggle()
const galleryFormData = reactive<Slide>({
  title: undefined,
  subtitle: undefined,
  src: '',
  id: '',
  priority: NaN
})
const galleryData = await galleryAPI.list()

const gallery = ref(galleryData)

const isEdit = ref(false)

const onSave = () => {
  gallery.value.push({ ...galleryFormData })
  toggleOpen()
}

const onEdit = (slide: Slide) => {
  isEdit.value = true
  const { src, subtitle, title, to, id, priority } = slide
  galleryFormData.src = src
  galleryFormData.title = title
  galleryFormData.subtitle = subtitle
  galleryFormData.to = to
  galleryFormData.id = id
  galleryFormData.priority = priority
  toggleOpen()
}

const onUpdate = () => {
  const idx = gallery.value.findIndex((item) => item.id === galleryFormData.id)
  gallery.value.splice(idx, 1, { ...galleryFormData })
  toggleOpen()
}

const onDelete = (id: string) => {
  gallery.value = gallery.value.filter((slide) => slide.id !== id)
}

const onAdd = () => {
  isEdit.value = false
  galleryFormData.src = ''
  galleryFormData.title = undefined
  galleryFormData.subtitle = undefined
  galleryFormData.to = undefined
  galleryFormData.id = `${gallery.value.length}`
  galleryFormData.priority = gallery.value.length
  toggleOpen()
}

const onCancel = () => {
  toggleOpen()
}

const onSaveChanges = async () => {
  gallery.value = gallery.value.map((slide, i) => {
    slide.priority = i
    slide.src = slide.src.replace('orig', '1500')
    return slide
  })
  await galleryAPI.updateAll(gallery)
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Галерея">
        <template #right>
          <UButton icon="i-heroicons-plus" label="Добавить слайд" color="gray" @click="onAdd" />
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent>
        <draggable v-model="gallery" class="select-none space-y-6" handle=".handle" animation="200" item-key="id">
          <template #item="{ element: item }">
            <div class="flex gap-2">
              <div class="space-y-2">
                <div class="handle flex h-10 w-6 cursor-grab place-items-center rounded-lg bg-zinc-800">
                  <UIcon name="heroicons:ellipsis-vertical-16-solid" class="mx-auto" />
                </div>
                <div
                  class="group flex h-10 w-6 cursor-pointer place-items-center rounded-lg bg-zinc-800/50 hover:bg-zinc-800"
                  @click="onEdit(item)"
                >
                  <UIcon
                    name="heroicons:cog-6-tooth"
                    class="mx-auto text-neutral-300/50 group-hover:text-neutral-300 group-active:text-neutral-100"
                  />
                </div>
                <div
                  class="group flex h-10 w-6 cursor-pointer place-items-center rounded-lg bg-zinc-800/50 hover:bg-zinc-800"
                  @click="onDelete(item.id)"
                >
                  <UIcon
                    name="heroicons:trash"
                    class="mx-auto text-red-500/50 group-hover:text-red-500 group-active:text-red-400"
                  />
                </div>
              </div>
              <div class="h-36 w-1/3 min-w-[500px] overflow-hidden rounded-lg bg-zinc-700">
                <img :src="item.src" class="size-full object-cover" alt="" />
              </div>
              <div class="w-2/5">
                <h3 class="mb-4 text-3xl font-bold">{{ item.title }}</h3>
                <h5 class="font-medium">{{ item.subtitle }}</h5>
              </div>
            </div>
          </template>
        </draggable>
        <UDashboardSection orientation="horizontal">
          <template #links>
            <UButton label="Сохранить изменения" color="black" @click="onSaveChanges" />
          </template>
        </UDashboardSection>
        <UModal v-model="isOpen">
          <UCard :ui="{ body: { base: 'space-y-2' } }">
            <UiImage v-model="galleryFormData.src" name="gallery" :ui="{ class: 'w-full h-36 mb-8' }" />
            <FormText size="xs" label="Заголовок" name="title" v-model="galleryFormData.title" />
            <FormText size="xs" label="Подзаголовок" name="subtitle" v-model="galleryFormData.subtitle" />
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton label="Отменить" color="red" variant="outline" @click="onCancel" />
                <UButton v-if="!isEdit" label="Добавить" color="green" @click="onSave" :disabled="galleryFormData.src === ''" />
                <UButton v-else label="Обновить" @click="onUpdate" />
              </div>
            </template>
          </UCard>
        </UModal>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.sortable-ghost {
  opacity: 0;
}
</style>
