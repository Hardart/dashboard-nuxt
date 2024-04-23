import { SCHEDULE_STATE } from '~/enums/scheduleEnum'
import type { ScheduleProperty, Schedule } from '~/scheme/z_program'

export const useSchedule = () => {
  const isOpenScheduleModal = useState(SCHEDULE_STATE.MODAL, () => false)
  const isTimeEqual = useState(SCHEDULE_STATE.TIME, () => true)
  const ids = useState<number[]>(SCHEDULE_STATE.IDS, () => [])
  const scheduleList = useState<Schedule[]>('schedule-list', () => [])

  const addPropertyToSchedule = () => ({ start: { hh: '00', mm: '00' }, end: { hh: '01', mm: '00' }, isReplay: false })
  const setScheduleTimeString = (info: ScheduleProperty) => `с ${info.start.hh}:${info.start.mm} до ${info.end.hh}:${info.end.mm}`

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

  const toggleScheduleModalState = () => (isOpenScheduleModal.value = !isOpenScheduleModal.value)

  return {
    isOpenScheduleModal,
    ids,
    scheduleList,
    isTimeEqual,
    addPropertyToSchedule,
    selectedIdsToWeekday,
    setScheduleTimeString,
    toggleScheduleModalState
  }
}
