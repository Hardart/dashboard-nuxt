import type { ProgramSchedulePropsItem } from '~/scheme/z_program'

export const useSchedule = () => {
  const isTimeEqual = ref(true)
  const selectedWeekdayIds = useState<number[]>('weekday-ids', () => [])
  const scheduleInfoState = useState<Record<string, ProgramSchedulePropsItem[]>>('schedule-info', () => ({}))
  const setScheduleTimeString = (info: ProgramSchedulePropsItem) =>
    `с ${info.start.hh}:${info.start.mm} до ${info.end.hh}:${info.end.mm}`

  const selectedIdsToWeekday = (array: number[]) => {
    switch (true) {
      case array.length == 7:
        return 'Каждый день'
      case array.length == 5 && array[0] === 1 && array[4] === 5:
        return 'По будням'
      case array.length == 2 && array.includes(6) && array.includes(7):
        return 'По выходным'
      default:
        return array.map((n) => weekdays.find((day) => day.id === n)?.title.full || '').join(', ')
    }
  }

  return {
    scheduleInfoState,
    selectedWeekdayIds,
    isTimeEqual,
    selectedIdsToWeekday,
    setScheduleTimeString
  }
}
