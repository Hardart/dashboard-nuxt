import { type User, type UserFormData } from '@/scheme/z_user'
import type { ResponseApi } from '~/types/fetch'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const userAPI = {
  async update(body: UserFormData) {
    return await useCustomFetch<UserResponse>('/user-update', { body })
  },

  async list() {
    const {data} = await useCustomFetch<ResponseApi.UserList>('/user-list')
    return data.value?.users || []
  }
}
