<script setup lang="ts">
const links = [
  [
    {
      label: 'Основные',
      icon: 'heroicons:wrench',
      to: '/settings',
      exact: true
    },
    {
      label: 'Профиль',
      icon: 'heroicons:user-circle',
      to: '/settings/profile'
    },
    {
      label: 'Админы',
      icon: 'i-heroicons-user-group',
      to: '/settings/members'
    },
    {
      label: 'Контакты',
      icon: 'i-heroicons-user-group',
      to: '/settings/contacts'
    },
    {
      label: 'Футер',
      icon: 'i-heroicons-puzzle-piece',
      to: '/settings/footer'
    }
  ]
]
provide('upload-image', 'avatar')
await useBaseStore().fetchBaseData()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Настройки" />

      <UDashboardToolbar class="overflow-x-auto px-1.5 py-0">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
