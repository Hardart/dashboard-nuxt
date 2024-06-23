<script setup lang="ts">
import type { Address, BaseContact, Mail, Phone } from '~/types/contact'

// const contact = defineModel<BaseContact>({ required: true })
defineProps<{
  contact: BaseContact
  title: string
  options: Phone[] | Address[] | Mail[]
  placeholder?: string
  optionAttribute: 'fullAddress' | 'address' | 'number'
}>()
</script>
<template>
  <div class="basis-1/6">
    <p class="text-sm">{{ title }}</p>
  </div>
  <div class="flex basis-5/6 gap-3">
    <FormText class="min-w-60" v-model="contact.label" placeholder="Заголовок" />
    <FormText class="flex-grow" v-model="contact.description" placeholder="Описание" />
    <UFormGroup class="min-w-60 flex-shrink">
      <USelectMenu placeholder :options v-model="contact.id" :option-attribute value-attribute="id" />
    </UFormGroup>
  </div>
</template>
