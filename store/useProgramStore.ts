import { ProgramsAPI } from '~/api/programs-api'
import type { Program, Schedule } from '~/scheme/z_program'
import type { User } from '~/scheme/z_user'

export const useProgramsStore = defineStore('programs', () => {
  const { ids, scheduleList, isTimeEqual, toggleScheduleModalState } = useSchedule()

  const programState: Program = {
    id: '',
    title: '',
    slug: 'asdfsffdfg',
    image: '',
    color: '#fff',
    schedule: [],
    hosts: [],
    isPublished: false
  }

  const idx = ref()
  const hosts = ref<User[]>([])
  const programFormData = ref<Program>({ ...programState })
  const programs = ref<Program[]>([])
  const tempSchedule = ref<Schedule>()
  const loading = ref(false)

  const findProgramById = (id: string) => {
    const p = programs.value.find((programsItem) => programsItem.id === id)
    if (!p) return console.warn('Cant find program')
    programFormData.value = p
  }

  async function getProgramList() {
    const { programs: programsData, hosts: hostsData } = await ProgramsAPI.list()
    programs.value = programsData.map((program) => {
      const sch = program.schedule.map((s) => {
        const sizes = combineNearDays(s.weekdayIds)
        return { ...s, sizes }
      })
      return { ...program, schedule: sch }
    })
    hosts.value = hostsData
  }

  function editSchedule(index: number) {
    idx.value = index
    const s = JSON.parse(JSON.stringify(programFormData.value.schedule[index])) as Schedule
    tempSchedule.value = s
    ids.value = tempSchedule.value.weekdayIds
    scheduleList.value.push(programFormData.value.schedule[index])
    programFormData.value.schedule.splice(index, 1)
    toggleScheduleModalState()
  }

  function addSchedule() {
    toggleScheduleModalState()
  }

  function resetProgram() {
    programFormData.value = { ...programState }
    scheduleList.value = []
    ids.value = []
    idx.value = undefined
    isTimeEqual.value = true
  }

  function removeSchedule(index: number) {
    programFormData.value.schedule.splice(index, 1)
  }

  function saveSchedule(index: number) {
    if (typeof idx.value !== 'undefined' && typeof tempSchedule.value !== 'undefined')
      programFormData.value.schedule.splice(idx.value, 0, scheduleList.value[0])
    else programFormData.value.schedule.push(...toValue(scheduleList))
    scheduleList.value = []
    ids.value = []
    idx.value = undefined
    isTimeEqual.value = true
    toggleScheduleModalState()
  }

  function cancelSaveSchedule() {
    console.log(tempSchedule.value)

    if (typeof idx.value !== 'undefined' && typeof tempSchedule.value !== 'undefined')
      programFormData.value.schedule.splice(idx.value, 0, { ...tempSchedule.value })
    tempSchedule.value = undefined
    scheduleList.value = []
    ids.value = []
    idx.value = undefined
    isTimeEqual.value = true
    toggleScheduleModalState()
  }

  async function saveProgram(p: Program) {
    loading.value = true
    const programData = await ProgramsAPI.save(p)
    loading.value = false
    if (!programData) return console.warn('Данные не получены')
    programs.value.push(programData)
    
  }

  async function deleteProgram(id: string) {
    loading.value = true
    const data = await ProgramsAPI.deleteOne({ id })
    loading.value = false
    if (!data) return console.warn('Данные не получены')
    programs.value = programs.value.filter((item) => item.id !== id)
  }

  function editProgram(p: Program) {}

  function storeRefs() {
    return {
      hosts,
      programs,
      programFormData,
      loading,
    }
  }

  return {
    storeRefs,
    saveProgram,
    editProgram,
    addSchedule,
    saveSchedule,
    cancelSaveSchedule,
    removeSchedule,
    editSchedule,
    getProgramList,
    findProgramById,
    deleteProgram,
    resetProgram
  }
})
