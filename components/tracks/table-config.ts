import type { Track } from '~/types/track'

export const columns = [
  {
    key: 'cover',
    class: 'w-10',
  },
  {
    key: 'artistName',
    label: 'Артист',
    sortable: true,
    class: 'w-1/3',
  },
  {
    key: 'trackTitle',
    label: 'Название песни',
    sortable: true,
  },
  {
    key: 'createdAt',
    label: 'Дата содзания',
    class: 'w-44',
  },
  {
    key: 'actions',
    class: 'w-10',
  },
]

export const editItems = (row: Track, editHandle: (row: Track) => void) => [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        editHandle(row)
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
