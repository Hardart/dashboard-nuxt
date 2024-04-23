import type { Program } from '~/scheme/z_program'
import type { ResponseApi } from '~/types/fetch'

export const ProgramsAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.ProgramList>('/program-list')
    const programs = data.value?.programs || []
    const hosts = data.value?.hosts || []
    return { programs, hosts }
  },
  async save(body: Program) {
    const { data } = await useCustomFetch<ResponseApi.ProgramSngle>('/program-add', { body })
    return data.value?.program
  }
}
