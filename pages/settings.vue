<script setup lang="ts">
const links = [
  [
    {
      label: 'Аккаунт',
      icon: 'i-heroicons-user-circle',
      to: '/settings',
      exact: true
    },
    {
      label: 'Админы',
      icon: 'i-heroicons-user-group',
      to: '/settings/members'
    },
    {
      label: 'Футер',
      icon: 'i-heroicons-puzzle-piece',
      to: '/settings/footer'
    }
  ]
]
provide('upload-image', 'avatar')
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
