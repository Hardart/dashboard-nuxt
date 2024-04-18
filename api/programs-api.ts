import type { ResponseApi } from '~/types/fetch'

export const ProgramsAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.ProgramList>('/program-list')
    const programs = data.value?.programs || []
    const hosts = data.value?.hosts || []
    return { programs, hosts }
  }
}
