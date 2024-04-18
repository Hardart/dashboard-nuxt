<script setup lang="ts">
const hours = createArrayOfNumbers(24)
</script>
<template>
  <div>
    <div class="grid h-[30px] w-20 place-items-center border-t border-zinc-700" v-for="hour in hours">{{ hour }}:00</div>
  </div>
</template>
