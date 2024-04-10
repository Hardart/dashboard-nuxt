import { type User, type UserFormData } from '@/scheme/z_user'
import type { ResponseApi } from '~/types/fetch'

export const authAPI = {
  async registration(body: object) {
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.RegistrationData>('/registration', { body })

    if (data.value?.user)
      toast.add({
        title: 'Пользователь успешно добавлен',
        timeout: 3000,
        color: 'emerald',
        icon: 'i-heroicons-check-circle-16-solid'
      })
    return data.value?.user
  },

  async login(body: UserFormData) {
    return await useCustomFetch<ResponseApi.LoginData>('/login', { body })
  },

  async checkToken() {
    const { data } = await useCustomFetch<Record<'user', User>>('/check')
    console.log(data)
    return
  }
}
