<script setup lang="ts">
import { ref } from 'vue'

// Создаем реактивное состояние для хранения выбранного цвета
const color = defineModel<string>({ required: true })
</script>
<template>
  <div class="flex flex-col items-center text-sm">
    <!-- <UInput type="color" class="size-10 appearance-none border-none bg-transparent !p-0" v-model="color" /> -->
    <p>Цвет программы</p>
    <input type="color" class="size-10 appearance-none border-none bg-transparent" v-model="color" />
  </div>
</template>

<style scoped>
input[type='color']::-webkit-color-swatch {
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
