import type { ProgramSchedule, Weekday } from '~/scheme/z_program'
import { weekdayIds, weekdays } from '@/utils/schedule'
export const useSchedule = () => {
  const weekdaysWithSelectedKey = weekdays.map((d) => {
    const el = d as Weekday
    el.selected = false
    return el
  })
  const selectedScheduleMode = ref('everyday')
  const selectedScheduleDays = ref<ProgramSchedule[]>([])
  const isTimeEqual = ref(true)

  const isCustomMode = computed(() => selectedScheduleMode.value == 'custom')
  const selectedWeekdayIds = computed(() => weekdaysWithSelectedKey.filter((day) => day.selected).map((day) => day.id))

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

  const isNearDay = (dayIds: number[]) => {
    const elem = { startFrom: 1, width: 1 }
    let nextValue = 0
    return dayIds.reduce(
      (curr, value) => {
        if (value === nextValue) {
          curr = curr.map((el) => {
            if (el.startFrom == elem.startFrom) el.width++
            return el
          })
        } else {
          elem.startFrom = value
          curr.push({ ...elem })
        }
        nextValue = value + 1
        return curr
      },
      [] as { startFrom: number; width: number }[]
    )
  }

  const onChange = (id: number) => {
    if (isTimeEqual.value) selectedScheduleDays.value = [setScheduleState(selectedWeekdayIds.value)]
    else selectedDaysLoop(id)
  }

  function selectedDaysLoop(id: number) {
    if (!selectedScheduleDays.value.some((schedule) => schedule.dayId.includes(id))) {
      selectedScheduleDays.value.push(setScheduleState([id]))
      selectedScheduleDays.value.sort((a, b) => (a.dayId > b.dayId ? 1 : -1))
    } else selectedScheduleDays.value = selectedScheduleDays.value.filter((schedule) => !schedule.dayId.includes(id))
  }

  function initSelectedDays() {
    const daysArray = isCustomMode.value ? selectedWeekdayIds.value : scheduleModeDayIds.value
    selectedScheduleDays.value = isTimeEqual.value
      ? [setScheduleState(daysArray)]
      : daysArray.map((dayId) => setScheduleState([dayId]))

    if (isCustomMode.value && !selectedWeekdayIds.value.length) selectedScheduleDays.value = []
  }

  watch([isTimeEqual, selectedScheduleMode], initSelectedDays, {
    immediate: true
  })

  return {
    weekdays,
    weekdayIds,
    selectedWeekdayIds,
    selectedScheduleMode,
    selectedScheduleDays,
    isTimeEqual,
    isCustomMode,
    scheduleModeDayIds,
    setScheduleState,
    onChange,
    isNearDay
  }
}
