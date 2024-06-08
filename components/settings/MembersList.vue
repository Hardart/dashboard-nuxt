<script setup lang="ts">
import type { User } from '~/scheme/z_user'

defineProps<{
  users: User[]
}>()

const emit = defineEmits(['on-edit', 'on-delete'])

function getItems(member: User) {
  return [
    [
      {
        label: 'Редактировать',
        click: () => emit('on-edit', member)
      },
      {
        label: 'Удалить',
        labelClass: 'text-red-500 dark:text-red-400',
        click: () => emit('on-delete', member)
      }
    ]
  ]
}
</script>

<template>
  <ul role="list" class="divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-800">
    <li v-for="(user, index) in users" :key="index" class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <UAvatar :src="correctImageSrc(user.avatar)" :alt="user.fullName" class="uppercase" imgClass="object-cover" size="xl" />

        <div class="min-w-0 text-sm">
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ user.fullName }}
          </p>
          <p class="truncate text-gray-500 dark:text-gray-400">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <p class="text-gray-500 dark:text-gray-400">
          {{ user.roles.join(', ') }}
        </p>

        <UDropdown :items="getItems(user)" position="bottom-end">
          <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
