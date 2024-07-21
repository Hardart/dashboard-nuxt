<script setup>
const { programs } = useNewProgramsStore().storeRefs()
function generateTimes() {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const formattedHour = String(hour).padStart(2, '0')
      const formattedMinute = String(minute).padStart(2, '0')
      times.push(`${formattedHour}:${formattedMinute}`)
    }
  }
  return times
}
const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const times = generateTimes()
</script>

<template>
  <div class="relative m-4 overflow-x-auto">
    <div class="sticky top-0 z-10">
      <table class="min-w-full table-fixed bg-gray-200 dark:bg-zinc-900">
        <thead>
          <tr>
            <th
              class="max-h-4 min-w-16 border border-gray-200 py-3 text-center text-sm text-xs font-medium text-gray-500 dark:border-zinc-700"
            >
              время
            </th>
            <th
              v-for="day in daysOfWeek"
              :key="day"
              class="min-w-24 border border-gray-200 px-2 py-3 text-center text-sm text-xs font-medium uppercase text-gray-500 dark:border-zinc-700"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <table class="relative min-w-full table-fixed divide-y divide-gray-200">
      <tbody class="divide-y divide-gray-200 bg-white dark:bg-zinc-800">
        <tr v-for="time in times" :key="time">
          <td
            class="h-[30px] min-w-16 whitespace-nowrap border border-gray-200 text-center text-xs text-gray-400 dark:border-zinc-700"
          >
            {{ time }}
          </td>
          <td
            v-for="day in daysOfWeek"
            :key="day"
            class="min-w-24 whitespace-nowrap border border-gray-200 px-2 text-sm text-gray-500 dark:border-zinc-700"
          >
            <!-- Здесь можно добавить содержимое ячеек расписания -->
          </td>
        </tr>
        <SchTableCard v-for="program in programs" :program />
      </tbody>
    </table>
  </div>
</template>
