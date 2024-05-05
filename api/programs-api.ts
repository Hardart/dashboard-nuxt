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
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.ProgramSngle>('/program-add', { body })
    if (data.value) toast.add({ title: 'Программа успешно добавлена', timeout: 3000, color: 'emerald', icon: 'i-heroicons-check-circle-16-solid' })
    return data.value?.program
  },
  async deleteOne(body: { id: string }) {
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.ProgramSngle>('/program-delete', { body })
    if (data.value)
      toast.add({ title: 'Программа успешно удалена', timeout: 3000, color: 'emerald', icon: 'i-heroicons-check-circle-16-solid' })
    return data.value?.program
  },
}
