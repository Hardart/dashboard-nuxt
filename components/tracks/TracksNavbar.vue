<script setup lang="ts">
defineProps<{
  count: string | number
  filteredCount: string | number
}>()
const query = defineModel<string>({ required: true })
const input = ref<{ input: HTMLInputElement }>()
defineShortcuts({ '/': () => input.value?.input?.focus() })
</script>

<template>
  <UDashboardNavbar title="Треки" :badge="count">
    <template #right>
      <div v-if="query.trim() !== ''">найдено: {{ filteredCount }}</div>
      <UInput
        ref="input"
        icon="i-heroicons-funnel"
        v-model="query"
        autocomplete="off"
        placeholder="Фильтр по названию..."
        class="hidden lg:block"
        @keydown.esc="$event.target.blur()"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>
    </template>
  </UDashboardNavbar>
</template>
