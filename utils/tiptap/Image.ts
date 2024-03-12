import Image from '@tiptap/extension-image'
const customImage = Image.configure({
  inline: true,
  HTMLAttributes: {
    class: 'rounded-xl',
  },
})

export default customImage
