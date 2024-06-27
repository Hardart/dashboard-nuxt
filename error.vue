<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div>
    <UMain>
      <UContainer>
        <UPage>
          <UPageError
            name="Ошибка"
            :message="error.message"
            :clear-button="{ label: 'На главную', color: 'red' }"
            :ui="{ status: 'text-red-500 text-3xl mb-4' }"
          />
        </UPage>
      </UContainer>
    </UMain>

    <UNotifications />
  </div>
</template>
