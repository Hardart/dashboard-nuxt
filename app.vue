<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === 'dark' ? '#111827' : '#ffffff'))

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'ru',
  },
})

const title = 'Радио "Штаны" - Панель управления'
const description =
  'Nuxt UI Pro is a collection of premium Vue components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout :name="$route.name == 'login' ? 'login' : 'default'">
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>
