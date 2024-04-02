export const useSchedule = () => {
  const weekdays = ref([
    { id: 1, title: { full: 'понедельник', short: 'пн' }, selected: false },
    { id: 2, title: { full: 'вторник', short: 'вт' }, selected: false },
    { id: 3, title: { full: 'среда', short: 'ср' }, selected: false },
    { id: 4, title: { full: 'четверг', short: 'чт' }, selected: false },
    { id: 5, title: { full: 'пятница', short: 'пт' }, selected: false },
    { id: 6, title: { full: 'суббота', short: 'сб' }, selected: false },
    { id: 7, title: { full: 'воскресенье', short: 'вс' }, selected: false },
  ])

  const weekdayIds = weekdays.value.map(day => day.id)

  const selectedWeekdayIds = computed(() => weekdays.value.filter(day => day.selected).map(day => day.id))

  return { weekdays, weekdayIds, selectedWeekdayIds }
}
