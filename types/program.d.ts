export interface PTest {
  id: number
  startFrom: number
  width: number
  color: string
  isReplay: boolean
  title?: string
  image?: string
  start: {
    hh: string
    mm: string
  }
  end: {
    hh: string
    mm: string
  }
}
