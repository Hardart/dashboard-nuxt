<script setup lang="ts">
const { addPhone, addMail, togglePhoneModalState, toggleMailModalState, storeRefs, cancelAddingOperation } = useBaseStore()
const { isOpenPhoneModal, isOpenMailModal, baseContactsFormData, phones, emails } = storeRefs()
const tableColumns = [
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
      <UTable :rows="emails" :columns="tableColumns" class="max-w-60" />
    </div>
  </UDashboardPanelContent>
</template>
