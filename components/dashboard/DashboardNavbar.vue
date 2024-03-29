<script setup lang="ts">
import type { Button } from '#ui/types'
const query = defineModel()
defineProps<{
  title: string
  badge?: string | number
  btn?: Button
  queryInput?: boolean
}>()
const input = ref<{ input: HTMLInputElement }>()
defineShortcuts({ '/': () => input.value?.input?.focus() })
</script>

<template>
  <UDashboardNavbar :title="title" :badge="badge">
    <template #right>
      <UInput
        v-if="queryInput"
        ref="input"
        v-model="query"
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

      <UButton v-if="btn" v-bind="{ ...btn, ...$attrs }" color="gray" @click="!btn.to ? $router.back() : undefined" />
    </template>
  </UDashboardNavbar>
</template>

<style></style>
