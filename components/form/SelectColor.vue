<script setup lang="ts">
const color = defineModel({ required: true })
const colors = [
    {label: 'Красный светлый', option: '#fca5a5'},
    {label: 'Красный', option: '#ef4444'},
    {label: 'Красный тёмный', option: '#b91c1c'},
    {label: 'Оранжевый', option: '#f97316'},
    {label: 'Жёлтый', option: '#eab308'},
    {label: 'Лайм', option: '#84cc16'},
    {label: 'Зелёный', option: '#22c55e'},
    {label: 'Зелёный тёмный', option: '#15803d'},
    {label: 'Изумрудный', option: '#10b981'},
    {label: 'Циан', option: '#06b6d4'},
    {label: 'Небесный', option: '#0ea5e9'},
    {label: 'Небесный тёмный', option: '#0369a1'},
    {label: 'Синий', option: '#3b82f6'},
    {label: 'Синий тёмный', option: '#1d4ed8'},
    {label: 'Фиолетовый', option: '#8b5cf6'},
    {label: 'Пурпурный', option: '#a855f7'},
    {label: 'Фуксия тёмный', option: '#a21caf'},
    {label: 'Розовый', option: '#ec4899'},
]

defineProps<{
  label: string
  required?: boolean
  name: string
  icon?: string
  autofocus?: boolean
  description?: string
}>()
</script>

<template>
  <UFormGroup :label :required :name :description class="w-1/5 min-w-44">
    <USelectMenu v-model="color" :options="colors" value-attribute="option" option-attribute="label" placeholder="Выбрать цвет" />
  </UFormGroup>
</template>
