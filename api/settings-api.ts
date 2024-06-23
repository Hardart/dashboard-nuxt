import type { Address, Contact, Mail, Phone } from '~/types/contact'
import type { ResponseApi, SettingAPI } from '~/types/fetch'

export const SettingsAPI = {
  async contacts() {
    const { data } = await useCustomFetch<SettingAPI.Contacts>('/settings/contacts')
    const contact = ref<Contact>(
      data.value?.contact || {
        phones: [],
        emails: [],
        addresses: []
      }
    )
    return { contact }
  },

  async footer() {
    const { data } = await useCustomFetch<SettingAPI.Footer>('/settings/footer')
    const contact = ref<Contact>(
      data.value?.contact || {
        phones: [],
        emails: [],
        addresses: []
      }
    )
    return { contact }
  },

  async updateFooter(contact: MaybeRef<Contact>) {
    const toast = useToast()
    const { status } = await useCustomFetch('/settings/footer', { body: toValue(contact), method: 'PUT' })

    if (status)
      toast.add({
        title: 'Контакты футера успешно обновлены',
        timeout: 2500,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
  },

  async updateContacts(contact: MaybeRef<Contact>) {
    const toast = useToast()
    const { status } = await useCustomFetch('/settings/contacts', { body: toValue(contact), method: 'PUT' })

    if (status)
      toast.add({
        title: 'Контакты успешно обновлены',
        timeout: 2500,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
  },

  async addPhone(phone: MaybeRef<Phone>) {
    const { data } = await useCustomFetch<ResponseApi.PhoneSingle>('/settings/phone', { body: toValue(phone) })
    return data.value
  },
  async addMail(mail: MaybeRef<Mail>) {
    const { data } = await useCustomFetch<ResponseApi.MailSingle>('/settings/email', { body: toValue(mail) })
    return data.value
  },
  async addAddress(address: MaybeRef<Address>) {
    const { data } = await useCustomFetch<ResponseApi.AddressSingle>('/settings/address', { body: toValue(address) })
    return data.value
  }
}
