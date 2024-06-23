<script setup lang="ts">
import type { Mail } from '~/types/contact'
const mailModel = defineModel<Mail>({ required: true })
const isOpen = defineModel<boolean>('openState', { required: true })
defineEmits(['cancel', 'add'])
</script>
<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold">Добавить контактный E-mail</h3>
      </template>
      <div class="space-y-3">
        <UFormGroup label="Почтовый ящик">
          <UInput placeholder="eugeniy@larin.ru" v-model="mailModel.address" />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex gap-4">
          <UButton label="Отменить" @click="$emit('cancel')" variant="outline" color="red" />
          <UButton label="Сохранить" variant="outline" @click="$emit('add')" :disabled="mailModel.address == ''" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
