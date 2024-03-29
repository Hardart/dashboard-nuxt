import { type User, type UserFormData } from '@/scheme/z_user'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const userAPI = {
  async update(body: UserFormData) {
    return await useCustomFetch<UserResponse>('/api/v1/dashboard/user-update', { body })
  },
}
