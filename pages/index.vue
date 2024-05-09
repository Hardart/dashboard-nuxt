<script setup lang="ts">
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
        <div class="flex items-center gap-4">
          <img src="/logo.svg" class="size-16" />
          <FormText label="Название сайта" name="site" v-model="baseFormData.siteName" class="flex-grow" />
          <FormText label="Возрастное ограничение" name="ageRate" v-model.number="baseFormData.ageRate" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
