import { ProgramsAPI } from '~/api/programs-api'
import type {
  Program,
  ProgramFormData,
  ProgramSchedule
} from '~/scheme/z_program'

export const useProgramsStore = defineStore('programs', () => {
  const programState = reactive<ProgramFormData>({
    title: '',
    description: '',
    hosts: [],
    schedule: []
  })

  const programs = ref<Program[]>()

  async function getProgramList() {
    const response = await ProgramsAPI.list()
    programs.value = response
  }

  function addProgram() {
    programs.value?.push({ ...programState, id: '11111' })
  }

  const deleteSchedule = (index: number) => {
    programState.schedule = programState.schedule.filter((_, i) => i !== index)
  }

  function storeRefs() {
    return {
      programState,
      programs
    }
  }

  return { storeRefs, deleteSchedule, addProgram, getProgramList }
})
