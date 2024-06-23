<script setup lang="ts">
import { BaseAPI } from '~/api/base-api'

const { addPhone, addMail, togglePhoneModalState, toggleMailModalState, storeRefs, cancelAddingOperation } = useBaseStore()
const { isOpenPhoneModal, isOpenMailModal, phones, emails } = storeRefs()
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection title="Данные футера" description="Редактирование контента в нижней части сайта">
      <template #links>
        <UButton type="submit" label="Добавить телефон" color="black" @click="togglePhoneModalState()" />
      </template>
      <UTable> </UTable>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
