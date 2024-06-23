<script setup lang="ts">
import type { Mail, Phone } from '~/types/contact'

const columns = [
  {
    key: 'address',
    label: 'Почтовые адреса',
    class: 'w-44'
  },
  {
    key: 'actions'
  }
]
defineProps<{
  rows: Mail[]
}>()
</script>
<template>
  <UTable :rows :columns class="max-w-52" />
</template>
