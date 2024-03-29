import { UploadURLS } from '@/scheme/enums'
import type { ResponseApi } from '~/types/fetch'

export const filesAPI = {
  async single(url: UploadURLS, body: FormData) {
    const { data } = await useCustomFetch<ResponseApi.FileSingle>(url, { body })
    return data.value?.path
  },

  async deleteSingle(url: keyof typeof UploadURLS, body: { path: string }) {
    const toast = useToast()
    const { data } = await useCustomFetch<{ file: object }>(UploadURLS[url], { body })
    if (data.value)
      toast.add({ title: 'Удаление прошло успешно', timeout: 2500, color: 'green', icon: 'i-heroicons-check-circle-16-solid' })
    return data.value?.file
  },
}
