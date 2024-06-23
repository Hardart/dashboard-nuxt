import type { Program } from '~/scheme/z_program'
import type { Contact, Mail, Phone } from '~/types/contact'
import type { ResponseApi } from '~/types/fetch'

export const BaseAPI = {
  async baseData() {
    const { data } = await useCustomFetch<ResponseApi.BaseData>('/base')
    const res = toValue(data)
    if (!res) createError('Cant fetch base contacts data')
    else
      res.addresses = res.addresses.map((ad) => {
        const { region, district, city, street, locality, houseNumber } = ad
        return { ...ad, fullAddress: `${region}, ${district}, ${city || locality}, ${street}, ${houseNumber}` } // добавить виртуальное поле в модели Address на бэкенде
      })
    return res
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
  }
}
