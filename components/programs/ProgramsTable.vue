<script setup lang="ts">
import type { Program } from '~/scheme/z_program'
import { columns } from './table-config'
import { PROGRAM_STATE } from '~/enums/programsEnum'
import { tryInject } from '~/utils/helpers'

const programs = tryInject<Program[]>(PROGRAM_STATE.LIST)
const selected = ref<Program[]>([])

defineProps<{
  loading: boolean
}>()

const emit = defineEmits(['delete'])

const editItems = (program: Program) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        navigateTo(`/programs/${program.id}`)
      }
    }
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        emit('delete', program.id)
      }
    }
  ]
]
</script>

<template>
  <UTable
    v-model="selected"
    :rows="programs"
    :loading="loading"
    :columns="columns"
    class="w-2/5"
    :ui="{
      divide: 'divide-gray-200 dark:divide-gray-800',
      td: { padding: 'py-2' }
    }"
  >
    <template #title-data="{ row }">
      <div class="flex items-center gap-3">
        <span class="text-gray-900 dark:text-white">{{ row.title }}</span>
      </div>
    </template>

    <template #image-data="{ row }">
      <div class="flex size-10 items-center gap-3 overflow-clip rounded">
        <img :src="correctImageSrc(row.image)" class="size-10 object-cover" alt="" />
      </div>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="editItems(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
