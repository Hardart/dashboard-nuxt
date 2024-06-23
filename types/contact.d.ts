type BaseContact = {
  id: string
  label: string
  description?: string
  priority?: number
}
export type Mail = {
  address: string
}

export type Phone = {
  number: string
}

export type Address = {
  city?: string
  locality?: string
  region: string
  district: string
  street: string
  zip: string
  houseNumber?: number
  appartment?: number
  yaMapUrl?: string
  fullAddress?: string
}

export type MailModel = BaseContact
export type PhoneModel = BaseContact
export type AddressModel = Omit<BaseContact, 'label'>

export type Contact = {
  emails: MailModel[]
  phones: PhoneModel[]
  addresses: AddressModel[]
}
