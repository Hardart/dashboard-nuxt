<script setup lang="ts">
import type { Address } from '~/types/contact'

defineProps<{
  rows: Address[]
}>()
const columns = [
  {
    key: 'street',
    label: 'Адреса'
  },

  {
    key: 'actions'
  }
]
</script>
<template>
  <UTable :rows :columns>
    <template #street-data="{ row }">
      <div class="flex items-center gap-3">
        {{ row.region }}, {{ row.district }}, {{ row.locality || row.city }}, {{ row.street }}, {{ row.houseNumber }},
        {{ row.zip }}
      </div>
    </template>
  </UTable>
</template>
