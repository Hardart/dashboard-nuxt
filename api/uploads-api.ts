import { UploadURLS } from '@/scheme/enums'

export const uploadsAPI = {
  async single(url: UploadURLS, body: FormData) {
    return await useCustomFetch<string>(url, { body })
  },

  async deleteFolder(url: keyof typeof UploadURLS, body: { path: string }) {
    return await useCustomFetch<{ status: string }>(UploadURLS[url], { body })
  },
}
