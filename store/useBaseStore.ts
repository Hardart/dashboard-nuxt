import { BaseAPI } from '~/api/base-api'
import type { Mail, Phone } from '~/types/contact'

export const useBaseStore = defineStore('base', () => {
  const phones = ref<Phone[]>([])
  const emails = ref<Mail[]>([])
  const baseContactsFormData = reactive({
    phone: undefined,
    email: undefined
  })
  const [isOpenPhoneModal, togglePhoneModalState] = useToggle()
  const [isOpenMailModal, toggleMailModalState] = useToggle()

  async function fetchBaseData() {
    const response = await BaseAPI.baseData()
    if (!response) return console.warn("Can't upload base data")
    phones.value = response.phones
    emails.value = response.emails
  }

  async function addPhone() {
    if (!baseContactsFormData.phone) return false
    const response = await BaseAPI.addPhone(baseContactsFormData.phone)
    if (!response) return console.warn('Some trouble with adding phone to Data Base')
    phones.value.push(response.phone)
    togglePhoneModalState()
    return true
  }

  async function addMail() {
    if (!baseContactsFormData.email) return false
    const response = await BaseAPI.addMail(baseContactsFormData.email)
    if (!response) return console.warn('Some trouble with adding email to Data Base')
    emails.value.push(response.email)
    toggleMailModalState()
    return true
  }

  function cancelAddingOperation() {
    togglePhoneModalState(false)
    toggleMailModalState(false)
    baseContactsFormData.phone = undefined
    baseContactsFormData.email = undefined
  }

  function storeRefs() {
    return { phones, emails, isOpenPhoneModal, isOpenMailModal, baseContactsFormData }
  }
  return { storeRefs, fetchBaseData, addPhone, addMail, togglePhoneModalState, toggleMailModalState, cancelAddingOperation }
})
