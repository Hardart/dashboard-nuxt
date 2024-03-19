import { Node, mergeAttributes } from '@tiptap/core'

export interface ImageOptions {
  HTMLAttributes: Record<string, any>
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageCustom: {
      /**
       * Add an image
       */
      setImage: (options: { src: string; alt?: string; title?: string; desc?: string }) => ReturnType
    }
  }
}
const CustomImage = Node.create<ImageOptions>({
  name: 'image',

  group: 'block',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'rounded-xl',
      },
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      desc: {
        default: null,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return ['p', ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)], node.attrs.desc && ['span', node.attrs.desc]]
  },

  addCommands() {
    return {
      setImage:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})

export default CustomImage
