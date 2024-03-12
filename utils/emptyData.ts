export const emptyCategory = {
  id: '',
  title: '',
  slug: '',
  createdAt: '',
  isPublished: false,
}

export const emptyArticle = {
  id: '',
  preview: '',
  title: '',
  slug: '',
  tags: [],
  content: '',
  category: { ...emptyCategory },
  createdAt: '',
  isPublished: false,
  publishAt: new Date(),
}
