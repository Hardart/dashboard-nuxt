<script setup lang="ts">
import type { Contact } from '~/types/contact'

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
      to: '/users'
    }
  ]
]

const baseFormData = reactive({
  siteName: '«Радио ШТАНЫ». Все только для тебя',
  ageRate: 12,
  logo: '/logo.svg',
  address: {
    city: '',
    street: ''
  }
})
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
        <!-- <div class="flex items-center gap-4">
          <img src="/logo.svg" class="size-16" />
          <FormText label="Название сайта" name="site" v-model="baseFormData.siteName" class="flex-grow" />
          <FormText label="Возрастное ограничение" name="ageRate" v-model.number="baseFormData.ageRate" />
        </div> -->
        <div class="my-4 grid grid-cols-4 gap-4">
          <ULandingCard
            title="Категории"
            description="Список всех добавленных категорий"
            icon="i-heroicons-rectangle-stack"
            color="primary"
            to="/categories"
            :ui="{
              background: 'dark:hover:bg-opacity-100',
              to: 'hover:ring-primary-500 dark:hover:ring-none dark:hover:bg-transparent transition-shadow duration-200'
            }"
          />
          <ULandingCard
            title="Новости"
            description="Список всех добавленных новостей"
            icon="i-heroicons-newspaper"
            color="primary"
            to="/articles"
            :ui="{
              background: 'dark:hover:bg-opacity-100',
              to: 'hover:ring-primary-500 dark:hover:ring-none dark:hover:bg-transparent transition-shadow duration-200'
            }"
          />
          <ULandingCard
            title="Программы"
            description="Список всех эфирных программ и шоу"
            icon="i-heroicons-radio"
            color="primary"
            to="/programs"
            :ui="{
              background: 'dark:hover:bg-opacity-100',
              to: 'hover:ring-primary-500 dark:hover:ring-none dark:hover:bg-transparent transition-shadow duration-200'
            }"
          />
          <ULandingCard
            title="Галлерея"
            description="Слайдер на главной странице"
            icon="i-heroicons-photo"
            color="primary"
            to="/gallery"
            :ui="{
              background: 'dark:hover:bg-opacity-100',
              to: 'hover:ring-primary-500 dark:hover:ring-none dark:hover:bg-transparent transition-shadow duration-200'
            }"
          />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
