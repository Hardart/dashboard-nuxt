<script setup>
const limits = {
  5000: 10,
  2000: 8,
  1000: 7,
  500: 5,
  100: 12
}

const atm = (amount, limits) => {
  if (amount == 0) return

  const keys = Object.keys(limits)
    .map(Number)
    .sort((a, b) => b - a)
  const result = {}

  for (const key of keys) {
    const count = Math.min(Math.floor(amount / key), limits[key])

    if (count > 0) {
      limits[key] -= count
      result[key] = count
      amount -= key * count
    }
  }
  if (amount > 0) {
    console.log('Невозможно выдать запрашиваемую сумму с текущими банкнотами.')
    return
  }
  console.log(result)
  console.log(limits)
  return result
}
const sum = ref(0)
</script>

<template>
  <UInput v-model="sum" />
  <UButton label="Выдать" @click="atm(sum, limits)" />
</template>
