<script setup lang="ts">
import { SettingsAPI } from '~/api/settings-api'
import { useBaseStore } from '~/store/useBaseStore'
const { phones, emails, addresses, phoneModel, mailModel, addressModel } = useBaseStore().storeRefs()

definePageMeta({
  middleware: ['is-admin']
})

const { contact } = await SettingsAPI.footer()
const onSaveChanges = async () => {
  await SettingsAPI.updateFooter(contact)
}
const onAddPhoneModel = () => contact.value.phones.push({ ...phoneModel })
const onAddMailModel = () => contact.value.emails.push({ ...mailModel })
const onAddAddressModel = () => contact.value.addresses.push({ ...addressModel })
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection title="Данные футера" description="Редактирование контента в нижней части сайта">
      <template #links>
        <UButton label="Добавить телефон" color="black" @click="onAddPhoneModel" />
        <UButton label="Добавить почту" color="black" @click="onAddMailModel" />
        <UButton label="Добавить адрес" color="black" @click="onAddAddressModel" />
        <UButton type="submit" label="Сохранить изменения" color="green" @click="onSaveChanges" />
      </template>

      <div class="divide-y">
        <div class="space-y-2 pb-4">
          <div class="flex items-center" v-for="phone in contact.phones">
            <SettingsContactsForm :contact="phone" option-attribute="number" title="Номер телефна" :options="phones" />
          </div>
        </div>

        <div class="space-y-2 py-4" v-if="contact.emails.length">
          <div class="flex items-center" v-for="mail in contact.emails">
            <SettingsContactsForm :contact="mail" option-attribute="address" title="Почтовый ящик" :options="emails" />
          </div>
        </div>
        <div class="space-y-2 py-4" v-if="contact.addresses.length">
          <div class="flex items-center" v-for="address in contact.addresses">
            <SettingsContactsForm :contact="address" option-attribute="fullAddress" title="Адрес" :options="addresses" />
          </div>
        </div>
      </div>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
