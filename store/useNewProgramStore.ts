export type NewSchedule = {
  dayOfWeekIds: number[]
  startTime: string
  duration: string
  isRepeat: boolean
}

export type NewProgram = {
  id?: number
  title: string
  isPublished: boolean
  description?: string
  imageUrl?: string
  hosts: string[]
  shedules: NewSchedule[]
  color: string
}

export const useNewProgramsStore = defineStore('newPrograms', () => {
  const router = useRouter()
  const scheduleModel: NewSchedule = { dayOfWeekIds: [1], startTime: '00:00', duration: '01:00', isRepeat: false }
  const programModel: NewProgram = {
    id: undefined,
    hosts: [],
    title: '',
    isPublished: false,
    imageUrl: undefined,
    shedules: [],
    color: '#ffffff'
  }
  const isEdit = ref(false)

  const programForm = ref<NewProgram>({ ...programModel, hosts: [], shedules: [] })
  const scheduleForEdit = ref<NewSchedule>(scheduleModel)
  const programs = ref<NewProgram[]>([])

  const addSchedule = () => programForm.value.shedules.push({ ...scheduleModel })

  const addProgramFormToProgramList = () => {
    if (isEdit.value) {
      const idx = programs.value.findIndex((p) => p.id == programForm.value.id)
      programs.value.splice(idx, 1, { ...programForm.value })
    } else {
      programs.value.push({ ...programForm.value, id: Date.now() })
    }
    programForm.value = { ...programModel, hosts: [], shedules: [] }
    isEdit.value = false
    router.push('/programs-new')
  }

  const resetProgramForm = () => {
    programForm.value = { ...programModel, hosts: [], shedules: [] }
    isEdit.value = false
  }

  const editProgram = async (program: NewProgram) => {
    isEdit.value = true
    programForm.value = program
    await navigateTo('/programs-new/new')
  }

  const deleteProgram = async (program: NewProgram) => {
    programs.value = programs.value.filter((p) => p.id !== program.id)
  }

  function storeRefs() {
    return { programs, programForm, scheduleForEdit, isEdit }
  }

  return { storeRefs, addSchedule, addProgramFormToProgramList, editProgram, resetProgramForm, deleteProgram }
})
