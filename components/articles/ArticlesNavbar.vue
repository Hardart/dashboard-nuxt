<script setup lang="ts">
const q = defineModel({ required: true })
defineProps<{
  newsCount: string | number
  addHandle: () => void
}>()
// const input = ref<{ input: HTMLInputElement }>()
// defineShortcuts({ '/': () => input.value?.input?.focus() })
</script>

<template>
  <UDashboardNavbar title="Новости" :badge="newsCount">
    <template #right>
      <!-- <UInput
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
      </UInput> -->

      <UButton label="Добавить новость" trailing-icon="i-heroicons-plus" color="gray" @click="addHandle" />
    </template>
  </UDashboardNavbar>
</template>
