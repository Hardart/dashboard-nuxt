<script setup lang="ts">
import type { User } from '~/scheme/z_user'

defineProps<{
  users: User[]
}>()

function getItems(member: User) {
  return [
    [
      {
        label: 'Редактировать',
        click: () => console.log('Edit', member)
      },
      {
        label: 'Удалить',
        labelClass: 'text-red-500 dark:text-red-400',
        click: () => console.log('Remove', member)
      }
    ]
  ]
}

function onRoleChange(member: User, role: string) {
  // Do something with data
  console.log(member.fullName, role)
}
</script>

<template>
  <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
    <li
      v-for="(user, index) in users"
      :key="index"
      class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
    >
      <div class="flex min-w-0 items-center gap-3">
        <UAvatar :src="user.avatar" imgClass="object-cover" size="xl" />

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
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            color="gray"
            variant="ghost"
          />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
