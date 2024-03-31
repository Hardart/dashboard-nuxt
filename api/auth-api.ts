import { type User, type UserFormData } from '@/scheme/z_user'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const authAPI = {
  async login(body: UserFormData) {
    return await useCustomFetch<UserResponse>('/login', { body })
  },

  async checkToken() {
    const { data } = await useCustomFetch<Record<'user', User>>('/check')
    console.log(data)
    return
  },
}
