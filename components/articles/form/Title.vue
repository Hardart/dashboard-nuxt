<script setup lang="ts">
const title = defineModel({ required: true })
</script>

<template>
  <UFormGroup label="Заголовок" class="w-full" required name="title">
    <UInput v-model="title" autofocus />
  </UFormGroup>
</template>

<style></style>
