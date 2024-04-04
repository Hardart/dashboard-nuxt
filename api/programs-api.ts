import type { ResponseApi } from '~/types/fetch'

export const ProgramsAPI = {
  async list() {
    const { data } =
      await useCustomFetch<ResponseApi.ProgramList>('/program-list')
    return data.value?.programs || []
  }
}
