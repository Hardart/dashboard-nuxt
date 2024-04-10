export const weekdays = [
  { id: 1, title: { full: 'понедельник', short: 'пн' } },
  { id: 2, title: { full: 'вторник', short: 'вт' } },
  { id: 3, title: { full: 'среда', short: 'ср' } },
  { id: 4, title: { full: 'четверг', short: 'чт' } },
  { id: 5, title: { full: 'пятница', short: 'пт' } },
  { id: 6, title: { full: 'суббота', short: 'сб' } },
  { id: 7, title: { full: 'воскресенье', short: 'вс' } }
]

export const weekday = (id: number) => ({
  get info() {
    return weekdays.find((day) => day.id === id)
  },
  get short() {
    return this.info?.title.short
  },
  get full() {
    return this.info?.title.full
  }
})

export const weekdayIds = weekdays.map((day) => day.id)
