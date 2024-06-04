export type Contact = {
  label: string
} & (
  | {
      type: 'phone'
      phoneId: string
    }
  | {
      type: 'mail'
      mailId: string
    }
  | {
      type: 'link'
      href: string
      text: string
    }
)

export type Phone = {
  number: string
  id: string
}

export type Mail = {
  title: string
  id: string
}
