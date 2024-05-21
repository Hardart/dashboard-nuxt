export type Contact = {
  label: string
} & (
  | {
      type: 'phone'
      phone: string
    }
  | {
      type: 'mail'
      mail: string
    }
  | {
      type: 'link'
      href: string
      text: string
    }
)
