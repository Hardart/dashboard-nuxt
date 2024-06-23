import { BaseAPI } from '~/api/base-api'
import { SettingsAPI } from '~/api/settings-api'
import type { Address, AddressModel, Mail, MailModel, Phone, PhoneModel } from '~/types/contact'

export const useBaseStore = defineStore('base', () => {
  const phone = ref<Phone>({ number: '' })
  const mail = ref<Mail>({ address: '' })
  const address = ref<Address>({ region: '', city: '', district: '', street: '', zip: '' })

  const phoneModel: PhoneModel = { id: '', label: '' }
  const mailModel: MailModel = { id: '', label: '' }
  const addressModel: AddressModel = { id: '' }

  const phones = ref<Phone[]>([])
  const emails = ref<Mail[]>([])
  const addresses = ref<Address[]>([])

  const [isOpenPhoneModal, togglePhoneModalState] = useToggle()
  const [isOpenMailModal, toggleMailModalState] = useToggle()
  const [isOpenAddressModal, toggleAddressModalState] = useToggle()

  async function fetchBaseData() {
    const response = await BaseAPI.baseData()
    if (!response) return console.warn("Can't upload base data")
    phones.value = response.phones
    emails.value = response.emails
    addresses.value = response.addresses
  }

  async function addPhone() {
    if (!phone.value.number) return false
    const response = await SettingsAPI.addPhone(phone)
    if (!response) return console.warn('Some trouble with adding phone to Data Base')
    phones.value.push(response.phone)
    togglePhoneModalState()
    _resetModels()
    return true
  }

  async function addAddress() {
    if (!address.value.street) return false
    const response = await SettingsAPI.addAddress(address)
    if (!response) return console.warn('Some trouble with adding phone to Data Base')
    addresses.value.push(response.address)
    toggleAddressModalState()
    _resetModels()
    return true
  }

  async function addMail() {
    if (!mail.value.address) return false
    const response = await SettingsAPI.addMail(mail)
    if (!response) return console.warn('Some trouble with adding email to Data Base')
    emails.value.push(response.email)
    toggleMailModalState()
    _resetModels()
    return true
  }

  function cancelAddingOperation() {
    togglePhoneModalState(false)
    toggleMailModalState(false)
    toggleAddressModalState(false)
    _resetModels()
  }

  async function _resetModels() {
    await delay(150)
    phone.value = { number: '' }
    mail.value = { address: '' }
    address.value = { region: '', city: '', district: '', street: '', zip: '' }
  }

  function storeRefs() {
    return {
      phones,
      emails,
      addresses,
      isOpenPhoneModal,
      isOpenMailModal,
      isOpenAddressModal,
      phoneModel,
      mailModel,
      addressModel,
      phone,
      mail,
      address
    }
  }

  return {
    storeRefs,
    fetchBaseData,
    addPhone,
    addMail,
    addAddress,
    togglePhoneModalState,
    toggleMailModalState,
    toggleAddressModalState,
    cancelAddingOperation
  }
})
