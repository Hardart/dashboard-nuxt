<script setup lang="ts">
const src = defineModel<string | undefined>({ required: true })
defineProps<{
  size?: string
  square?: boolean
}>()
</script>
<template>
  <div class="aspect-photo group relative size-32 overflow-clip rounded-lg">
    <img v-if="src" class="aspect-photo absolute h-full w-full object-cover" :src alt="" />
    <div v-else class="absolute inset-0 grid place-items-center bg-zinc-700">
      <UIcon name="i-heroicons-photo" class="size-10" />
    </div>
    <div class="absolute bottom-2 hidden w-full justify-around px-3 group-hover:flex">
      <UTooltip text="Загрузить" :openDelay="0">
        <UiUploadImage
          name="programs"
          v-model="src"
          :btn="{
            variant: 'ghost',
            icon: 'i-material-symbols-add-photo-alternate-outline-rounded',
            color: 'gray',
            class: 'border border-zinc-500 bg-zinc-700/40'
          }"
        />
      </UTooltip>
      <UTooltip text="Выбрать" :openDelay="0" :closeDelay="0">
        <UiImageSelect
          v-model="src"
          :btn="{
            square: true,
            variant: 'ghost',
            color: 'gray',
            icon: 'i-material-symbols-image-search-rounded',
            class: 'border border-zinc-500 bg-zinc-700/40'
          }"
        />
      </UTooltip>
    </div>
  </div>
</template>
