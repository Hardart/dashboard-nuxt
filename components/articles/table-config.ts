import type { Article } from '~/scheme/z_article'

export const editItems = (article: Article, editHandle: (item: Article) => void) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        editHandle(article)
      },
    },
  ],
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
    },
  ],
]

export const columns = [
  {
    key: 'title',
    label: 'Название',
    sortable: true,
  },
  {
    key: 'category',
    label: 'Категория',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Статус',
  },
  {
    key: 'actions',
  },
]
