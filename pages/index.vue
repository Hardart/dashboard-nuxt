<script setup lang="ts">
import { filesAPI } from '~/api/files-api'
import { UploadURLS } from '~/scheme/enums'

const items = [
  [
    {
      label: 'Создать новость',
      icon: 'i-heroicons-pencil-square',
      to: '/articles/add'
    },
    {
      label: 'Создать категорию',
      icon: 'i-heroicons-document-plus',
      to: '/categories/add'
    },
    {
      label: 'New user',
      icon: 'i-heroicons-user-plus',
      to: '/settings/members'
    }
  ]
]

const cardsData = [
  {
    title: 'Категории',
    description: 'Список всех добавленных категорий',
    icon: 'i-heroicons-rectangle-stack',
    color: 'primary',
    to: '/categories'
  },
  {
    title: 'Новости',
    description: 'Список всех добавленных новостей',
    icon: 'i-heroicons-newspaper',
    color: 'primary',
    to: '/articles'
  },
  {
    title: 'Программы',
    description: 'Список всех эфирных программ и шоу',
    icon: 'i-heroicons-radio',
    color: 'primary',
    to: '/programs'
  },
  {
    title: 'Галлерея',
    description: 'Слайдер на главной странице',
    icon: 'i-heroicons-photo',
    color: 'primary',
    to: '/gallery'
  }
]
const src = ref<string | undefined>('/images/team/02.webp')
const avatarSrc = ref('')
const form = ref<HTMLFormElement | null>(null)
const onSubmit = async () => { }

const onChange = async () => {
  console.log('onChange')
  const formToValue = toValue(form)
  if (!formToValue) return
  const body = new FormData(formToValue)
  const avatar = await filesAPI.single(UploadURLS.avatar, body)
  if (avatar) src.value = correctImageSrc(avatar)
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Главная">
        <template #right>
          <UDropdown :items="items">
            <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <div class="my-4 grid grid-cols-4 gap-4">
          <ULandingCard v-for="{ title, description, icon, to } in cardsData" :title :description :icon color="primary"
            :to :ui="{
              background: 'dark:hover:bg-opacity-100',
              to: 'hover:ring-primary-500 dark:hover:ring-none dark:hover:bg-transparent transition-shadow duration-200'
            }" />
        </div>
        <Atm />
        <!-- <form @submit.prevent="onSubmit" ref="form" v-if="!avatarSrc">
          <div class="inline-block p-2">
            <label
              for="image"
              class="bg-gray text-primary focus-within:ring-primary hover:text-primary-500 relative cursor-pointer rounded-md p-2 font-semibold focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-2"
            >
              <span>Загрузить аватар</span>
              <input id="image" name="avatar" type="file" class="sr-only" @change="onChange" />
            </label>
          </div>
        </form> -->
        <!-- <div class="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-rose-300" v-if="avatarSrc">
          <img :src="avatarSrc" class="w-full object-cover" alt="" />
          <div class="h-full w-full bg-rose-200"></div>
        </div> -->
        <!-- <HdrtDragImage v-if="src" :src /> -->
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
