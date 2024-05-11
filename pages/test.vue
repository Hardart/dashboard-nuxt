<script setup lang="ts">
const slides = ref([
  { id: 1, title: 'dsnvsjnvdfjv' },
  { id: 2, title: 'pjomen' },
  { id: 3, title: 'vfjenfk' },
  { id: 4, title: 'povnvrnvjkr' }
])
</script>

<template>
  <draggable v-model="slides">
    <template #item="{ element: item }">
      <div class="item">
        <div class="title">{{ item.title }}</div>
        <FormText label="Заголовок" name="title" v-model="item.title" />
      </div>
    </template>
  </draggable>
</template>
