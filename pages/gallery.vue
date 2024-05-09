<script setup lang="ts">
const galleryFormData = reactive({})

const gallery = ref([
  { title: 'Image 1', subTitle: 'sub title 1' },
  { title: 'Image 2', subTitle: 'sub title 2' },
  { title: 'Image 3', subTitle: 'sub title 3' },
  { title: 'Image 4', subTitle: 'sub title 4' },
  { title: 'Image 5', subTitle: 'sub title 5' }
])
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Галерея" />
      <UDashboardPanelContent class="select-none space-y-6">
        <div v-for="item in gallery" class="ring-primary flex items-center gap-4">
          <div class="flex size-8 cursor-grab place-items-center rounded-lg bg-zinc-800 active:cursor-grabbing">
            <UIcon name="heroicons:chevron-up-down" class="mx-auto" />
          </div>
          <div class="h-36 w-1/3 rounded-lg bg-zinc-700"></div>
          <div class="w-2/5 space-y-4">
            <FormText label="Заголовок" name="title" v-model="item.title" />
            <FormText label="Под заголовок" name="subtitle" v-model="item.subTitle" />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
