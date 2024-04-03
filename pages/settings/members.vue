<script setup lang="ts">
import { userAPI } from '~/api/user-api';
import type { Member } from '~/types'
const users = await userAPI.list()


const q = ref('')
const isInviteModalOpen = ref(false)

const filteredMembers = computed(() => {
  return users.filter(user => {
    return user.fullName.search(new RegExp(q.value, 'i')) !== -1 || user.email.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Manage access"
      description="Invite new members by email address."
      :ui="{ wrapper: 'lg:sticky top-2' }"
    >
      <template #links>
        <UButton label="Добавить пользователя" color="black" @click="isInviteModalOpen = true" />
      </template>

      
    </UDashboardSection>
    <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
      <template #header>
        <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Search members" autofocus />
      </template>

      <!-- ~/components/settings/MembersList.vue -->
      <SettingsMembersList :members="filteredMembers" />
    </UCard>
    <UDashboardModal
      v-model="isInviteModalOpen"
      title="Добавить пользователя"
      description="Добавить редактора сайта или ведущего программ"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <!-- ~/components/settings/MembersForm.vue -->
      <SettingsMembersForm @close="isInviteModalOpen = false" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
