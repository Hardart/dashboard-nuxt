import Paragraph from '@tiptap/extension-paragraph'

const CustomP = Paragraph.extend({
  name: 'test',
  renderHTML({ HTMLAttributes }) {
    return ['p', ['span', HTMLAttributes, 0]]
  },
  addCommands() {
    return {
      setCustomParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
    }
  },
})

export default CustomP
