import { authAPI } from '~/api/auth-api'
import type { User, UserFormData } from '~/scheme/z_user'

export const useUserStore = defineStore('user', () => {
  const { decodeAccessToken, setAccessToken, getAccessToken, cleanAccessToken } = useTokens()
  const user = ref<User>()
  const loading = ref(false)

  async function login(loginData: UserFormData) {
    loading.value = true
    const { data } = await authAPI.login(loginData)
    loading.value = false
    if (!data.value) return false
    setAccessToken(data.value.accessToken)
    user.value = decodeAccessToken()
    return true
  }

  async function tryRefreshToken() {
    if (!getAccessToken()) return
    await authAPI.checkToken()
    return true
  }

  async function logout() {
    cleanAccessToken()
    user.value = undefined
    await navigateTo('/login')
    return true
  }

  const storeRefs = () => ({ loading, user })

  return { login, storeRefs, tryRefreshToken, logout }
})
