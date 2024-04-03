<script setup lang="ts">
import type { User } from '~/scheme/z_user';



defineProps({
  members: {
    type: Array as PropType<User[]>,
    default: () => []
  }
})

function getItems (member: User) {
  return [[{
    label: 'Edit member',
    click: () => console.log('Edit', member)
  }, {
    label: 'Remove member',
    labelClass: 'text-red-500 dark:text-red-400',
    click: () => console.log('Remove', member)
  }]]
}

function onRoleChange (member: User, role: string) {
  // Do something with data
  console.log(member.fullName, role)
}

</script>

<template>
  <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
    <li v-for="(user, index) in members" :key="index" class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6">
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar :src="user.avatar" size="md" />

        <div class="text-sm min-w-0">
          <p class="text-gray-900 dark:text-white font-medium truncate">
            {{ user.fullName }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 truncate">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <p class="text-gray-500 dark:text-gray-400">{{ user.roles }}</p>

        <UDropdown :items="getItems(user)" position="bottom-end">
          <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
        </UDropdown>
      </div>
    </li>
  </ul>
</template>
