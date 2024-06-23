<script setup lang="ts">
import type { Phone } from '~/types/contact'

defineProps<{
  rows: Phone[]
}>()
const columns = [
  {
    key: 'number',
    label: 'Телефоны',
    class: 'w-44'
  },

  {
    key: 'actions'
  }
]
</script>
<template>
  <UTable :rows :columns class="max-w-52" />
</template>
