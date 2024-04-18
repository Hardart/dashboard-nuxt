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
      label: 'Уведомления',
      icon: 'i-heroicons-bell',
      to: '/settings/notifications'
    }
  ],
  [
    {
      label: 'Documentation',
      icon: 'i-heroicons-book-open',
      to: 'https://ui.nuxt.com/pro',
      target: '_blank'
    },
    {
      label: 'Buy now',
      icon: 'i-heroicons-credit-card',
      to: 'https://ui.nuxt.com/pro/purchase',
      target: '_blank'
    }
  ]
]
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
