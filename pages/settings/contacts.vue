<script setup lang="ts">
import { SettingsAPI } from '~/api/settings-api'
import { useBaseStore } from '~/store/useBaseStore'
const { phones, emails, addresses, phoneModel, mailModel, addressModel } = useBaseStore().storeRefs()

definePageMeta({
  middleware: ['is-admin']
})

const { contact } = await SettingsAPI.contacts()
const onSaveChanges = async () => {
  await SettingsAPI.updateContacts(contact)
}
const onAddPhoneModel = () => contact.value.phones.push({ ...phoneModel })
const onAddMailModel = () => contact.value.emails.push({ ...mailModel })
const onAddAddressModel = () => contact.value.addresses.push({ ...addressModel })
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection title="Данные страницы Контакты" description="данные отображаются в разделе 'Федеральная редакция'">
      <template #links>
        <UButton label="Добавить телефон" color="black" @click="onAddPhoneModel" />
        <UButton label="Добавить почту" color="black" @click="onAddMailModel" />
        <UButton label="Добавить адрес" color="black" @click="onAddAddressModel" />
        <UButton type="submit" label="Сохранить изменения" color="green" @click="onSaveChanges" />
      </template>
      <div class="divide-y">
        <div class="space-y-2 pb-4">
          <div class="grid grid-cols-3 items-center" v-for="phone in contact.phones">
            <div>
              <p class="text-sm">Номер телефна</p>
            </div>
            <div class="col-span-2 flex gap-3">
              <UFormGroup class="w-64">
                <UInput class="w-full" placeholder="Заголовок" v-model="phone.label" />
              </UFormGroup>
              <UFormGroup class="flex-grow">
                <UInput placeholder="Описание" v-model="phone.description" />
              </UFormGroup>
              <UFormGroup class="basis-52">
                <USelectMenu
                  placeholder="Выбрать телефон"
                  :options="phones"
                  v-model="phone.id"
                  option-attribute="number"
                  value-attribute="id"
                />
              </UFormGroup>
            </div>
          </div>
        </div>

        <div class="space-y-2 py-4" v-if="contact.emails.length">
          <div class="grid grid-cols-3 items-center" v-for="mail in contact.emails">
            <div>
              <p class="text-sm">Почтовый ящик</p>
            </div>
            <div class="col-span-2 flex gap-3">
              <UFormGroup class="w-64">
                <UInput class="w-full" placeholder="Заголовок" v-model="mail.label" />
              </UFormGroup>
              <UFormGroup class="flex-grow">
                <UInput placeholder="Описание" v-model="mail.description" />
              </UFormGroup>
              <UFormGroup class="basis-52">
                <USelectMenu
                  placeholder="Выбрать адрес"
                  :options="emails"
                  v-model="mail.id"
                  option-attribute="address"
                  value-attribute="id"
                />
              </UFormGroup>
            </div>
          </div>
        </div>
        <div class="space-y-2 py-4" v-if="contact.addresses.length">
          <div class="grid grid-cols-3 items-center" v-for="address in contact.addresses">
            <div>
              <p class="text-sm">Адрес компнии</p>
            </div>
            <div class="col-span-2 flex gap-3">
              <UFormGroup class="basis-1/2">
                <UInput placeholder="Описание" v-model="address.description" />
              </UFormGroup>
              <UFormGroup class="flex-grow">
                <USelectMenu
                  placeholder="Выбрать адрес"
                  :options="addresses"
                  v-model="address.id"
                  option-attribute="fullAddress"
                  value-attribute="id"
                />
              </UFormGroup>
            </div>
          </div>
        </div>
      </div>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
