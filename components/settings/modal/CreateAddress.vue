<script setup lang="ts">
import type { Address } from '~/types/contact'

const addressModel = defineModel<Address>({ required: true })
const isOpen = defineModel<boolean>('openState', { required: true })

defineEmits(['cancel', 'add'])
</script>
<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold">Добавить адрес компании</h3>
      </template>
      <div class="space-y-2">
        <div class="flex gap-2">
          <UFormGroup label="Область" class="flex-grow">
            <UInput placeholder="Пензенская обл." v-model="addressModel.region" />
          </UFormGroup>
          <UFormGroup label="Район" class="flex-grow">
            <UInput placeholder="Бессоновский район" v-model="addressModel.district" />
          </UFormGroup>
        </div>
        <div class="flex gap-2">
          <UFormGroup label="Город" class="flex-grow">
            <UInput placeholder="г. Пенза" v-model="addressModel.city" />
          </UFormGroup>
          <UFormGroup label="Село/Деревня" class="flex-grow">
            <UInput placeholder="село Чемодановка" v-model="addressModel.locality" />
          </UFormGroup>
        </div>
        <div class="flex gap-2">
          <UFormGroup label="Улица" class="flex-grow">
            <UInput placeholder="ул. Новотамбовская" v-model="addressModel.street" />
          </UFormGroup>
          <UFormGroup label="Дом" class="basis-10">
            <UInput placeholder="3" v-model="addressModel.houseNumber" />
          </UFormGroup>
          <UFormGroup label="Индекс" class="basis-24">
            <UInput placeholder="440000" v-model="addressModel.zip" />
          </UFormGroup>
        </div>
        <div class="grid gap-2">
          <UFormGroup label="Ссылка Яндекс карты">
            <UInput v-model="addressModel.yaMapUrl" />
          </UFormGroup>
        </div>
      </div>
      <template #footer>
        <div class="flex gap-4">
          <UButton label="Отменить" @click="$emit('cancel')" variant="outline" color="red" />
          <UButton label="Сохранить" @click="$emit('add')" variant="outline" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
