<script setup lang="ts">
const { addPhone, addMail, togglePhoneModalState, toggleMailModalState, storeRefs, cancelAddingOperation } = useBaseStore()
const { isOpenPhoneModal, isOpenMailModal, baseContactsFormData, phones, emails } = storeRefs()
const phoneColumns = [
  {
    key: 'number',
    label: 'Контактные телефоны'
  },
  {
    key: 'actions'
  }
]
const mailColumns = [
  {
    key: 'title',
    label: 'Почтовые ящики'
  },
  {
    key: 'actions'
  }
]
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <div class="grid grid-cols-6 gap-6">
      <UButton label="Добавить телефон" icon="heroicons:phone" size="xl" variant="outline" @click="togglePhoneModalState()" />
      <UButton label="Добавить e-mail" icon="heroicons:envelope" variant="outline" size="xl" @click="toggleMailModalState()" />
    </div>
    <div class="grid grid-cols-6 gap-6">
      <UTable :rows="phones" :columns="phoneColumns" class="max-w-60">
        <template #number-data="{ row }">
          <div class="w-44">{{ row.number }}</div>
        </template>
      </UTable>
      <UTable :rows="emails" :columns="mailColumns" class="max-w-60" />
    </div>
  </UDashboardPanelContent>
  <UModal v-model="isOpenPhoneModal">
    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold">Добавить контактный телефон</h3>
      </template>
      <UFormGroup label="Телефон">
        <UInput placeholder="+7 (999) 999 99 99" v-model="baseContactsFormData.phone" />
      </UFormGroup>
      <template #footer>
        <div class="flex gap-4">
          <UButton label="Отменить" @click="cancelAddingOperation" variant="outline" color="red" />
          <UButton
            label="Сохранить"
            @click="addPhone"
            variant="outline"
            :disabled="typeof baseContactsFormData.phone == 'undefined'"
          />
        </div>
      </template>
    </UCard>
  </UModal>
  <UModal v-model="isOpenMailModal">
    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold">Добавить контактный E-mail</h3>
      </template>
      <UFormGroup label="Почтовый ящик">
        <UInput placeholder="eugeniy@larin.ru" v-model="baseContactsFormData.email" />
      </UFormGroup>
      <template #footer>
        <div class="flex gap-4">
          <UButton label="Отменить" @click="cancelAddingOperation" variant="outline" color="red" />
          <UButton
            label="Сохранить"
            variant="outline"
            @click="addMail"
            :disabled="typeof baseContactsFormData.email == 'undefined'"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
