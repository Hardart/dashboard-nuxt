<script setup lang="ts">
import { BaseAPI } from '~/api/base-api'
import type { Contact } from '~/types/contact'
definePageMeta({
  middleware: ['is-admin']
})

const { contacts } = await BaseAPI.list()
const contactsFormData = ref(contacts)
const onSaveChanges = async () => {
  await BaseAPI.updateFooterContacts(contactsFormData)
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection title="Данные футера" description="Редактирование контента в нижней части сайта">
      <template #links>
        <UButton type="submit" label="Сохранить изменения" color="black" @click="onSaveChanges" />
      </template>
      <div v-for="contact in contactsFormData">
        <div v-if="contact.type === 'mail'" class="grid grid-cols-3 items-center gap-2">
          <h3>Почта</h3>
          <div class="col-span-2 flex gap-2">
            <UFormGroup class="flex-grow">
              <UInput v-model="contact.label" />
            </UFormGroup>
            <UFormGroup class="min-w-60">
              <UInput v-model="contact.mail" />
            </UFormGroup>
          </div>
        </div>
        <div v-if="contact.type === 'phone'" class="grid grid-cols-3 items-center gap-2">
          <h3>Телефон</h3>
          <div class="col-span-2 flex gap-2">
            <UFormGroup class="flex-grow">
              <UInput v-model="contact.label" />
            </UFormGroup>
            <UFormGroup class="min-w-60">
              <UInput v-model="contact.phone" />
            </UFormGroup>
          </div>
        </div>
        <div v-if="contact.type === 'link'" class="grid grid-cols-3 items-center gap-2">
          <h3>Адрес</h3>
          <div class="col-span-2 grid grid-cols-2 gap-2">
            <UFormGroup>
              <UInput v-model="contact.label" />
            </UFormGroup>
            <UFormGroup>
              <UInput v-model="contact.href" />
            </UFormGroup>
            <UFormGroup class="col-span-2">
              <UInput v-model="contact.text" />
            </UFormGroup>
          </div>
        </div>
      </div>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
