import type { ProgramFormData, ProgramSchedule } from '~/scheme/z_program'
export const useSchedule = () => {
  const weekdays = ref([
    { id: 1, title: { full: 'понедельник', short: 'пн' }, selected: false },
    { id: 2, title: { full: 'вторник', short: 'вт' }, selected: false },
    { id: 3, title: { full: 'среда', short: 'ср' }, selected: false },
    { id: 4, title: { full: 'четверг', short: 'чт' }, selected: false },
    { id: 5, title: { full: 'пятница', short: 'пт' }, selected: false },
    { id: 6, title: { full: 'суббота', short: 'сб' }, selected: false },
    { id: 7, title: { full: 'воскресенье', short: 'вс' }, selected: false }
  ])

  const weekdayIds = weekdays.value.map((day) => day.id)
  const selectedScheduleMode = ref('everyday')
  const selectedScheduleDays = ref<ProgramSchedule[]>([])

  const isSameTime = ref(true)

  const isCustomMode = computed(() => selectedScheduleMode.value == 'custom')
  const selectedWeekdayIds = computed(() =>
    weekdays.value.filter((day) => day.selected).map((day) => day.id)
  )
  const scheduleModeDayIds = computed(() => {
    switch (selectedScheduleMode.value) {
      case 'everyday':
        return weekdayIds
      case 'workdays':
        return weekdayIds.slice(0, 5)
      case 'weekend':
        return weekdayIds.slice(-2)
      default:
        return []
    }
  })

  function setScheduleState(dayId: number[]) {
    return {
      dayId,
      start: { hh: '12', mm: '00' },
      end: { hh: '13', mm: '00' },
      isReplay: false
    }
  }

  const onChange = (id: number) => {
    if (isSameTime.value)
      selectedScheduleDays.value = [setScheduleState(selectedWeekdayIds.value)]
    else selectedDaysLoop(id)
  }

  function selectedDaysLoop(id: number) {
    if (
      !selectedScheduleDays.value.some((schedule) =>
        schedule.dayId.includes(id)
      )
    ) {
      selectedScheduleDays.value.push(setScheduleState([id]))
      selectedScheduleDays.value.sort((a, b) => (a.dayId > b.dayId ? 1 : -1))
    } else
      selectedScheduleDays.value = selectedScheduleDays.value.filter(
        (schedule) => !schedule.dayId.includes(id)
      )
  }

  function initSelectedDays() {
    const daysArray = isCustomMode.value
      ? selectedWeekdayIds.value
      : scheduleModeDayIds.value
    selectedScheduleDays.value = isSameTime.value
      ? [setScheduleState(daysArray)]
      : daysArray.map((dayId) => setScheduleState([dayId]))

    if (isCustomMode.value && !selectedWeekdayIds.value.length)
      selectedScheduleDays.value = []
  }

  watch([isSameTime, selectedScheduleMode], initSelectedDays, {
    immediate: true
  })

  return {
    weekdays,
    weekdayIds,
    selectedWeekdayIds,
    selectedScheduleMode,
    selectedScheduleDays,
    isSameTime,
    isCustomMode,
    scheduleModeDayIds,
    setScheduleState,
    onChange
  }
}
