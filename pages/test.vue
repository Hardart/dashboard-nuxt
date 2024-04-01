<script setup lang="ts">
import type { ProgramFormData, ProgramSchedule } from '~/scheme/z_program'
const isSameTime = ref(true)
const selectedSchedule = ref('everyday')

const weekdays = ref([
  { id: 1, title: { full: 'понедельник', short: 'пн' }, selected: false },
  { id: 2, title: { full: 'вторник', short: 'вт' }, selected: false },
  { id: 3, title: { full: 'среда', short: 'ср' }, selected: false },
  { id: 4, title: { full: 'четверг', short: 'чт' }, selected: false },
  { id: 5, title: { full: 'пятница', short: 'пт' }, selected: false },
  { id: 6, title: { full: 'суббота', short: 'сб' }, selected: false },
  { id: 7, title: { full: 'воскресенье', short: 'вс' }, selected: false },
])

const programSchedule = [
  { value: 'everyday', label: 'Каждый день' },
  { value: 'workdays', label: 'По будням' },
  { value: 'weekend', label: 'По выходным' },
  { value: 'custom', label: 'Выбрать день' },
]
const selectedDaysSchedule = ref<ProgramSchedule[]>([])

const scheduleTime = { hh: '12', mm: '00' }
const fillDayIds = (daysCount: number = 7, startFrom: number = 0) => new Array(daysCount).fill('').map((_, index) => index + startFrom)

const scheduleFormData = (daysCount: number = 7, startFrom: number = 1) => ({
  dayId: fillDayIds(daysCount, startFrom),
  start: { ...scheduleTime },
  end: { ...scheduleTime },
  isReplay: false,
})

const programFormData = reactive<ProgramFormData>({
  title: '',
  description: '',
  hosts: [],
  schedule: [],
})

const hours = new Array(24).fill('').map((_, index) => (index < 10 ? `0${index}` : `${index}`))
const minutes = new Array(60)
  .fill('')
  .map((_, index) => (index < 10 ? `0${index}` : `${index}`))
  .filter((_, i) => i % 5 == 0)

const onSelectDay = () => {
  // scheduleFormData.dayId = weekdays.value.filter(day => day.selected).map(day => day.id)
}

const fillSchedule = (daysCount: number = 7, startFrom: number = 1, idsLength: number = 1) =>
  new Array(daysCount).fill('').map((_, index) => scheduleFormData(idsLength, index + startFrom))

watch([isSameTime, selectedSchedule], setScheduleOnEveryday, { immediate: true })

function setScheduleOnEveryday() {
  if (isSameTime.value) {
    selectedDaysSchedule.value = selectedSchedule.value === 'custom' ? [] : [scheduleFormData()]
  } else {
    setScheduleOnExactDay()
  }
}

function setScheduleOnExactDay() {
  switch (selectedSchedule.value) {
    case 'everyday':
      selectedDaysSchedule.value = fillSchedule()
      break
    case 'custom':
      selectedDaysSchedule.value = []
      break
    case 'workdays':
      selectedDaysSchedule.value = fillSchedule(5)
      break
    case 'weekend':
      selectedDaysSchedule.value = fillSchedule(2, 6)
      break
  }
}

const onAddSchedule = () => programFormData.schedule.push(...selectedDaysSchedule.value)
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel :width="800">
      <DashboardNavbar title="Добавить новостю" :btn="{ label: 'Назад', icon: 'i-heroicons-arrow-long-left-16-solid' }" />
      <UDashboardPanelContent>
        <div>
          <UFormGroup label="Название программы">
            <UInput v-model="programFormData.title" />
          </UFormGroup>
          <ul>
            <li v-for="schedule in programFormData.schedule">{{ schedule.dayId }} - {{ schedule.isReplay }}</li>
          </ul>

          <UPopover :ui="{ container: 'w-[800px]' }" :popper="{ placement: 'bottom-start' }">
            <UButton label="Добавить расписание" class="inline-block" />
            <template #panel>
              <UCard class="min-h-96">
                <div class="flex gap-8 mb-6">
                  <URadio
                    class="flex"
                    v-for="method of programSchedule"
                    :key="method.value"
                    v-model="selectedSchedule"
                    v-bind="method"
                    legend="Дни выхода программы"
                  />
                  <UFormGroup label="Единое время">
                    <UToggle v-model="isSameTime" />
                  </UFormGroup>
                </div>
                <div class="flex gap-5" v-if="selectedSchedule == 'custom'">
                  <UCheckbox v-for="day in weekdays" :label="day.title.short" v-model="day.selected" @change="onSelectDay" />
                </div>
                <div class="flex justify-around p-4 ring-1 rounded-lg mb-3" v-for="schedule in selectedDaysSchedule">
                  <div class="flex gap-2 items-center">
                    <p class="text-sm">Начало</p>
                    <UFormGroup class="w-20">
                      <USelectMenu :options="hours" v-model="schedule.start.hh" />
                    </UFormGroup>
                    <UFormGroup class="w-20">
                      <USelectMenu :options="minutes" v-model="schedule.start.mm" />
                    </UFormGroup>
                  </div>
                  <div class="flex gap-2 items-center">
                    <p class="text-sm">Конец</p>
                    <UFormGroup class="w-20">
                      <USelectMenu :options="hours" />
                    </UFormGroup>
                    <UFormGroup class="w-20">
                      <USelectMenu :options="minutes" />
                    </UFormGroup>
                  </div>
                  <div class="flex gap-2 items-center">
                    <p class="text-sm">Повтор</p>
                    <UFormGroup>
                      <UToggle v-model="schedule.isReplay" />
                    </UFormGroup>
                  </div>
                </div>
                <div><UButton label="Добавить" @click="onAddSchedule" /></div>
              </UCard>
            </template>
          </UPopover>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
    {{ programFormData }}
  </UDashboardPage>
</template>

<!-- <ul class="flex flex-col gap-10">
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
        </ul> -->

<!-- function getScheduleDays(array: number[]): string {
          if (array.length == 7) return 'Каждый день'
          if (array.length == 5) return 'По будням'
          if (array.length == 2 && array.includes(6 && 7)) return 'По выходным'
          return array.map(n => weekdays.find(day => day.id === n)?.title.full || '').join(', ')
        } -->
<!-- 
        watch(
  selectedSchedule,
  () => {
    switch (selectedSchedule.value) {
      case 'everyday':
        scheduleFormData.dayId = new Array(7).fill('').map((_, i) => i + 1)
        break
      case 'custom':
        scheduleFormData.dayId = []
        programFormData.schedule = []
        break
      case 'workdays':
        scheduleFormData.dayId = new Array(5).fill('').map((_, i) => i + 1)
        break
      case 'weekend':
        scheduleFormData.dayId = new Array(2).fill('').map((_, i) => i + 6)
        break
    }
  },
  {
    immediate: true,
  }
) -->
