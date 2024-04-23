<script setup lang="ts">
const title = defineModel({ required: true })
</script>

<template>
  <FormText v-model="title" name="title" label="Название программы" required />
</template>
