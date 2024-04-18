import { ProgramsAPI } from '~/api/programs-api'
import type { Program, ProgramForTable, ProgramSchedule, ProgramSchedulePropsItem } from '~/scheme/z_program'
import type { User } from '~/scheme/z_user'

export const useProgramsStore = defineStore('programs', () => {
  const { selectedWeekdayIds, scheduleInfoState } = useSchedule()

  const programState: Program = {
    id: '',
    title: '',
    slug: '',
    image: '',
    color: '#7e22ce',
    schedule: [],
    hosts: []
  }

  const scheduleState = reactive<ProgramSchedule>({
    properties: [],
    weekdayIds: []
  })
  const hosts = ref<User[]>([])
  const isAdded = ref(false) // helper
  const [scheduleModalState, toggleScheduleModalState] = useToggle()
  const programFormData = ref<Program>({ ...programState })
  const programs = ref<Program[]>()

  async function getProgramList() {
    const { programs: programsData, hosts: hostsData } = await ProgramsAPI.list()
    programs.value = programsData
    hosts.value = hostsData
  }

  function addSchedule(properties: Record<string, ProgramSchedulePropsItem[]>) {
    Object.entries(properties).forEach(([key, value]) => {
      scheduleState.weekdayIds = parseInt(key) === 0 ? selectedWeekdayIds.value : [parseInt(key)]
      scheduleState.properties = value
      programFormData.value.schedule.push({ ...scheduleState })
    })
    toggleScheduleModalState()
    selectedWeekdayIds.value = []
    scheduleInfoState.value = {}
    if (isAdded.value) return
    programFormData.value.id = String((programs.value?.length || 0) + 1)
    programs.value?.push(programFormData.value)
    isAdded.value = true
  }

  function addProgram() {
    programState.schedule = []
    programFormData.value = { ...programState }
    console.log(programFormData.value)
    isAdded.value = false
  }

  function editProgram(p: ProgramForTable) {
    selectedWeekdayIds.value = p.weekdayIds
    scheduleInfoState.value[0] = p.properties
    toggleScheduleModalState()
  }

  function storeRefs() {
    return {
      hosts,
      scheduleModalState,
      programs,
      programFormData
    }
  }

  return { storeRefs, addProgram, editProgram, addSchedule, getProgramList, toggleScheduleModalState }
})
