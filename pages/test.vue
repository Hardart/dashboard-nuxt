<script setup lang="ts">
interface ISome {
  startFromId: number
  width: number
}
let nextValue = 0
let id = 0

const combineNearDays = (weekdayIds: number[]) => {
  return weekdayIds.reduce(reduceIds, [] as ISome[])
}

function reduceIds(acc: ISome[], curr: number, index: number) {
  const obj: ISome = { width: 1, startFromId: 1 }
  if (nextValue == curr) {
    nextValue++
    acc[id].width++
  } else {
    id = index
    nextValue = curr + 1
    obj.startFromId = curr
    acc.push(obj)
  }
  return acc
}
</script>

<template>
  {{ combineNearDays(ids) }}
</template>

<style></style>
