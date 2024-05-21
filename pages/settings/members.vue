<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { User } from '~/scheme/z_user'
import { userAPI } from '~/api/user-api'
import { authAPI } from '~/api/auth-api'
definePageMeta({
  middleware: ['is-admin']
})

const users = ref(await userAPI.list())

const q = ref('')
const [isAddModalOpen, toggle] = useToggle()

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  const userData = { ...event.data }
  userData.email += '@test.ru'

  const user = await authAPI.registration(userData)
  if (user) users.value.push(user)
  toggle()
}

const filteredMembers = computed(() => {
  return users.value.filter((user) => {
    return user.fullName.search(new RegExp(q.value, 'i')) !== -1 || user.email.search(new RegExp(q.value, 'i')) !== -1
  })
})

const onDelete = (user: User) => {
  users.value = users.value.filter((u) => u.id !== user.id)
}

const onEdit = (user: User) => {
  console.log(user)
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Список сотрудников"
      description="Поиск и редактирование прав"
      :ui="{ wrapper: 'lg:sticky top-2 max-w-4xl' }"
    >
      <template #links>
        <UButton label="Добавить пользователя" color="black" @click="isAddModalOpen = true" />
      </template>
    </UDashboardSection>
    <UCard
      :ui="{
        header: { padding: 'p-4 sm:px-6 sticky top-0 bg-zinc-900/50 backdrop-blur-sm z-40' },
        base: 'flex flex-col overflow-y-scroll ',
        body: { padding: '' }
      }"
      class="max-w-4xl"
    >
      <template #header>
        <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Поиск по имени и email" autofocus />
      </template>

      <!-- ~/components/settings/MembersList.vue -->
      <SettingsMembersList :users="filteredMembers" @on-delete="onDelete" @on-edit="onEdit" />
    </UCard>
    <UDashboardModal
      v-model="isAddModalOpen"
      title="Добавить пользователя"
      description="Добавить редактора сайта или ведущего программ"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <!-- ~/components/settings/MembersForm.vue -->
      <SettingsMembersForm @close="isAddModalOpen = false" @on-submit="onSubmit" />
    </UDashboardModal>
  </UDashboardPanelContent>
</template>
