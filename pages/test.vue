<script setup lang="ts">
import type { ResponseApi } from '~/types/fetch';

const weekdays = [
  { id: 1, title: { full: 'понедельник', short: 'пн' } },
  { id: 2, title: { full: 'вторник', short: 'вт' } },
  { id: 3, title: { full: 'среда', short: 'ср' } },
  { id: 4, title: { full: 'четверг', short: 'чт' } },
  { id: 5, title: { full: 'пятница', short: 'пт' } },
  { id: 6, title: { full: 'суббота', short: 'сб' } },
  { id: 7, title: { full: 'воскресенье', short: 'вс' } },
]

const { data } = await useCustomFetch<ResponseApi.ProgramList>('/program-list')
const programs = data.value?.programs

function getScheduleDays(array: number[]): string {
  if (array.length == 7) return 'Каждый день'
  if (array.length == 5) return 'По будням'
  if (array.length == 2 && array.includes(6 && 7)) return 'По выходным'
  return array.map(n => weekdays.find(day => day.id === n)?.title.full || '').join(', ')
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel :width="800">
      <UDashboardPanelContent>
        <UFormGroup label="Название программы">
          <UInput />
        </UFormGroup>
        <ul class="flex flex-col gap-10">
          <li v-for="program in programs">
            <div class="flex items-center gap-3 mb-2">
              <div class="size-10"><img :src="program.image" class="object-cover" alt=""></div>
              <h2 class="text-3xl">{{ program.title }}</h2>
            </div>
            <div>


              <ul>
                <li v-for="item in program.schedule" class="flex">
                  <p class="first-letter:uppercase">{{ getScheduleDays(item.dayId) }}: с {{ item.start }} до {{ item.end
                    }} <sup class="text-yellow-300" v-if="item.isReplay">повтор</sup></p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
