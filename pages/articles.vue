<script lang="ts" setup>
import { useArticleStore } from '~/store/useArticleStore'
const { fetchArticles, storeRefs, transformArticleToFormData } = useArticleStore()
await fetchArticles()
const { articles, articleFormData, selectedStatuses, selectedCategories, sort, q, categories } = storeRefs()
const input = ref<{ input: HTMLInputElement }>()
const isNewArticleModalOpen = ref(false)
const statuses = [
  { option: 'опубликовано', value: true },
  { option: 'не опубликовано', value: false },
]

const items = (row: any) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        articleFormData.value = transformArticleToFormData(row)
        isNewArticleModalOpen.value = true
      },
    },
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
    },
  ],
]
defineShortcuts({
  '/': () => input.value?.input?.focus(),
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Новости" :badge="articles.length">
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Фильтр по названию..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton label="Добавить новость" trailing-icon="i-heroicons-plus" color="gray" @click="isNewArticleModalOpen = true" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Статус"
            multiple
            :options="statuses"
            option-attribute="option"
            value-attribute="value"
            :ui-menu="{ option: { base: 'capitalize' } }"
            class="min-w-[150px]"
          />
          <USelectMenu
            v-model="selectedCategories"
            icon="i-heroicons-presentation-chart-bar"
            placeholder="Категории"
            multiple
            :options="categories"
            option-attribute="title"
            value-attribute="id"
            :ui-menu="{ option: { base: 'capitalize' } }"
            class="min-w-[180px]"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardModal
        v-model="isNewArticleModalOpen"
        title="Добавить новость"
        description="Добавить новостную запись в базу данных"
        :ui="{ width: 'sm:max-w-5xl' }"
      >
        <!-- ~/components/users/ArticlesForm.vue -->
        <ArticlesForm @close="isNewArticleModalOpen = false" />
      </UDashboardModal>

      <ArticlesTable :news="articles" :edit-items="items" v-model="sort" />
    </UDashboardPanel>
  </UDashboardPage>
</template>
