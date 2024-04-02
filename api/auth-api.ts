import { type User, type UserFormData } from '@/scheme/z_user'
import type { ResponseApi } from '~/types/fetch'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const authAPI = {
  async registration(body: object) {
    return await useCustomFetch<UserResponse>('/registration', { body })
  },

  async login(body: UserFormData) {
    return await useCustomFetch<ResponseApi.LoginData>('/login', { body })
  },

  async checkToken() {
    const { data } = await useCustomFetch<Record<'user', User>>('/check')
    console.log(data)
    return
  },
}
