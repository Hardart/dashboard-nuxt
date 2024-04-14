import type { ProgramSchedulePropsItem } from '~/scheme/z_program'

export const useSchedule = () => {
  const isTimeEqual = ref(true)

  const isNearDay = (weekdayIds: number[]) => {
    let nextValue = 0
    return weekdayIds.reduce(
      (acc, curr) => {
        if (!acc.startFromId) {
          nextValue = curr
          acc.startFromId = curr
          acc.width = 1
        }
        if (nextValue + 1 == curr) {
          nextValue++
          acc.width++
        }

        return acc
      },
      {} as { startFromId: number; width: number }
    )
  }

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
    isTimeEqual,
    isNearDay,
    selectedIdsToWeekday,
    setScheduleTimeString
  }
}
