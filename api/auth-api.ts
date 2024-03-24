import { type User, type UserFormData } from '@/scheme/z_user'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const authAPI = {
  async login(body: UserFormData) {
    return await useCustomFetch<UserResponse>('/admin/login', { body, method: 'POST' })
  },

  async checkToken() {
    const { data } = await useCustomFetch<Record<'user', User>>('/admin/check')
    return
  },
}
