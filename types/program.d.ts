export interface ScheduleProps {
  start: {
    hh: string
    mm: string
  }
  end: {
    hh: string
    mm: string
  }
  isReplay: boolean
}

export interface PTest {
  id: number
  startFrom: number
  width: number
  color: string
  title?: string
  image?: string
  scheduleProps: ScheduleProps[]
}
