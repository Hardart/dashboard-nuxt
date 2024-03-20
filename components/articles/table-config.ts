import type { Article } from '~/scheme/z_article'

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
