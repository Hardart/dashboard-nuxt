<script setup lang="ts">
import type { Member } from '~/types'

const members: Member[] = [
  {
    name: 'Anthony Fu',
    username: 'antfu',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' },
  },
  {
    name: 'Sébastien Chopin',
    username: 'Atinux',
    role: 'owner',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' },
  },
  {
    name: 'Benjamin Canac',
    username: 'benjamincanac',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' },
  },
  {
    name: 'Céline Dumerc',
    username: 'celinedumerc',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/celinedumerc' },
  },
  {
    name: 'Daniel Roe',
    username: 'danielroe',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' },
  },
  {
    name: 'Farnabaz',
    username: 'farnabaz',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/farnabaz' },
  },
  {
    name: 'Ferdinand Coumau',
    username: 'FerdinandCoumau',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/FerdinandCoumau' },
  },
  {
    name: 'Florent Delerue',
    username: 'Flosciante',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/Flosciante' },
  },
  {
    name: 'Baptiste Leproux',
    username: 'larbish',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/larbish' },
  },
  {
    name: 'Pooya Parsa',
    username: 'pi0',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' },
  },
  {
    name: 'Sarah Moriceau',
    username: 'SarahM19',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/SarahM19' },
  },
  {
    name: 'Sylvain Marroufin',
    username: 'smarroufin',
    role: 'member',
    avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/smarroufin' },
  },
]

const q = ref('')
const isInviteModalOpen = ref(false)

const filteredMembers = computed(() => {
  return members.filter(member => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Manage access"
      description="Invite new members by email address."
      orientation="horizontal"
      :ui="{ container: 'lg:sticky top-2' }"
    >
      <template #links>
        <UButton label="Добавить пользователя" color="black" @click="isInviteModalOpen = true" />
      </template>

      <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Search members" autofocus />
        </template>

        <!-- ~/components/settings/MembersList.vue -->
        <SettingsMembersList :members="filteredMembers" />
      </UCard>
    </UDashboardSection>

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
