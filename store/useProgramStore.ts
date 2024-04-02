import type { ProgramFormData, ProgramSchedule } from '~/scheme/z_program'

export const useProgramsStore = defineStore('programs', () => {
  const { selectedWeekdayIds, weekdayIds, weekdays } = useSchedule()

  const selectedScheduleMode = ref('everyday')
  const selectedScheduleDays = ref<ProgramSchedule[]>([])

  const isSameTime = ref(true)
  const programState = reactive<ProgramFormData>({
    title: '',
    description: '',
    hosts: [],
    schedule: [],
  })

  const isCustomMode = computed(() => selectedScheduleMode.value == 'custom')

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
      isReplay: false,
    }
  }

  const deleteSchedule = (index: number) => {
    programState.schedule = programState.schedule.filter((_, i) => i !== index)
  }

  const onChange = (id: number) => {
    if (isSameTime.value) selectedScheduleDays.value = [setScheduleState(selectedWeekdayIds.value)]
    else selectedDaysLoop(id)
  }

  function selectedDaysLoop(id: number) {
    if (!selectedScheduleDays.value.some(schedule => schedule.dayId.includes(id))) {
      selectedScheduleDays.value.push(setScheduleState([id]))
      selectedScheduleDays.value.sort((a, b) => (a.dayId > b.dayId ? 1 : -1))
    } else selectedScheduleDays.value = selectedScheduleDays.value.filter(schedule => !schedule.dayId.includes(id))
  }

  function initSelectedDays() {
    const daysArray = isCustomMode.value ? selectedWeekdayIds.value : scheduleModeDayIds.value
    selectedScheduleDays.value = isSameTime.value ? [setScheduleState(daysArray)] : daysArray.map(dayId => setScheduleState([dayId]))

    if (isCustomMode.value && !selectedWeekdayIds.value.length) selectedScheduleDays.value = []
  }

  function storeRefs() {
    return {
      programState,
      isSameTime,
      isCustomMode,
      selectedScheduleMode,
      selectedScheduleDays,
      scheduleModeDayIds,
      selectedWeekdayIds,
      weekdayIds,
      weekdays,
    }
  }

  watch([isSameTime, selectedScheduleMode], initSelectedDays, { immediate: true })

  return { storeRefs, setScheduleState, deleteSchedule, onChange }
})
