import type { ProgramSchedule, Weekday } from '~/scheme/z_program'

export const useSchedule = () => {
  const isTimeEqual = ref(true)

  const isNearDay = (weekdayIds: number[]) => {
    const elem = { startFrom: 1, width: 1 }
    let nextValue = 0
    return weekdayIds.reduce(
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

  return {
    isTimeEqual,
    isNearDay
  }
}
