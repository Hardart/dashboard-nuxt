<script setup lang="ts">
const {
  addPhone,
  addMail,
  addAddress,
  togglePhoneModalState,
  toggleMailModalState,
  toggleAddressModalState,
  storeRefs,
  cancelAddingOperation
} = useBaseStore()
const { isOpenPhoneModal, isOpenMailModal, isOpenAddressModal, phones, emails, addresses, phone, mail, address } = storeRefs()
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <div>
      <UDashboardSection title="Контактные данные" description="контактные данные, для разных разделов сайта">
        <template #links>
          <UButton icon="heroicons:phone" label="Добавить телефон" color="black" @click="togglePhoneModalState()" />
          <UButton icon="heroicons:envelope" label="Добавить e-mail" color="black" @click="toggleMailModalState()" />
          <UButton icon="heroicons:home" label="Добавить адрес" color="black" @click="toggleAddressModalState()" />
        </template>
        <div class="flex gap-10">
          <SettingsContactsPhones :rows="phones" />
          <SettingsContactsEmails :rows="emails" />
          <SettingsContactsAddresses :rows="addresses" />
        </div>
      </UDashboardSection>
    </div>
  </UDashboardPanelContent>
  <SettingsModalCreatePhone
    v-model:open-state="isOpenPhoneModal"
    v-model="phone"
    @add="addPhone"
    @cancel="cancelAddingOperation"
  />
  <SettingsModalCreateEmail v-model:open-state="isOpenMailModal" v-model="mail" @add="addMail" @cancel="cancelAddingOperation" />
  <SettingsModalCreateAddress
    v-model:open-state="isOpenAddressModal"
    v-model="address"
    @add="addAddress"
    @cancel="cancelAddingOperation"
  />
</template>
