<script setup lang="ts">
const colorMode = useColorMode()
const { tryRefreshToken } = useUserStore()
await tryRefreshToken()
const color = computed(() => (colorMode.value === 'dark' ? '#111827' : '#ffffff'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: color }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'ru'
  }
})

const title = 'Радио "Штаны" - Панель управления'

useSeoMeta({ title })
const { $ws } = useNuxtApp()
const socket = $ws(3071, null)
useState('socket', () => socket)
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
  <UModals />
</template>
