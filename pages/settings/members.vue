<script setup lang="ts">
import { userAPI } from '~/api/user-api'
const users = await userAPI.list()

const q = ref('')
const [isAddModalOpen] = useToggle()

const filteredMembers = computed(() => {
  return users.filter((user) => {
    return (
      user.fullName.search(new RegExp(q.value, 'i')) !== -1 ||
      user.email.search(new RegExp(q.value, 'i')) !== -1
    )
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Список сотрудников"
      description="Поиск и редактирование прав"
      :ui="{ wrapper: 'lg:sticky top-2 max-w-4xl' }"
    >
      <template #links>
        <UButton
          label="Добавить пользователя"
          color="black"
          @click="isAddModalOpen = true"
        />
      </template>
    </UDashboardSection>
    <UCard
      :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }"
      class="max-w-4xl"
    >
      <template #header>
        <UInput
          v-model="q"
          icon="i-heroicons-magnifying-glass"
          placeholder="Поиск по имени и email"
          autofocus
        />
      </template>

      <!-- ~/components/settings/MembersList.vue -->
      <SettingsMembersList :users="filteredMembers" />
    </UCard>
    <UDashboardModal
      v-model="isAddModalOpen"
      title="Добавить пользователя"
      description="Добавить редактора сайта или ведущего программ"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <!-- ~/components/settings/MembersForm.vue -->
      <SettingsMembersForm @close="isAddModalOpen = false" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
