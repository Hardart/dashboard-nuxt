<script setup lang="ts">
import { BaseAPI } from '~/api/base-api'
import { useBaseStore } from '~/store/useBaseStore'
const { phones, emails } = useBaseStore().storeRefs()
definePageMeta({
  middleware: ['is-admin']
})

const { contacts } = await BaseAPI.footerData()
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
              <USelectMenu v-model="contact.mailId" :options="emails" value-attribute="id" option-attribute="title" />
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
              <USelectMenu v-model="contact.phoneId" :options="phones" value-attribute="id" option-attribute="number" />
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
