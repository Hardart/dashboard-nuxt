import type { Program } from '~/scheme/z_program'
import type { Contact } from '~/types/contact'
import type { ResponseApi } from '~/types/fetch'

export const BaseAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.FooterData>('/base')
    const contacts = data.value?.contacts || []
    return { contacts }
  },
  async save(body: Program) {
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.ProgramSngle>('/program-add', { body })
    if (data.value)
      toast.add({
        title: 'Программа успешно добавлена',
        timeout: 2500,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
    return data.value?.program
  },
  async deleteOne(body: { id: string }) {
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.ProgramSngle>('/program-delete', { body })
    if (data.value)
      toast.add({
        title: 'Программа успешно удалена',
        timeout: 2500,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
    return data.value?.program
  },
  async updateFooterContacts(body: MaybeRef<Contact[]>) {
    body = toValue(body)
    const toast = useToast()
    const { status } = await useCustomFetch('/base/footer-update', { body })

    if (status)
      toast.add({
        title: 'Контакты успешно обновлены',
        timeout: 2500,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
  }
}
