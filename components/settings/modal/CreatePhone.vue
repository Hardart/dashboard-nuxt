<script setup lang="ts">
import type { Phone } from '~/types/contact'
const phoneModel = defineModel<Phone>({ required: true })
const isOpen = defineModel<boolean>('openState', { required: true })

defineEmits(['cancel', 'add'])
</script>
<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold">Добавить контактный телефон</h3>
      </template>
      <div class="space-y-3">
        <UFormGroup label="Телефон">
          <UInput placeholder="+7 (999) 999 99 99" v-model="phoneModel.number" />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex gap-4">
          <UButton label="Отменить" @click="$emit('cancel')" variant="outline" color="red" />
          <UButton label="Сохранить" @click="$emit('add')" variant="outline" :disabled="phoneModel.number == ''" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
