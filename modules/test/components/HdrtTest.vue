<script setup lang="ts">
defineProps<{
  src: string
}>()
const message = ref('Hello from MyComponent')
</script>
<template>
  <div>
    <h1>{{ message }}</h1>
    <img :src alt="" />
  </div>
</template>
