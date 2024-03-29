import { authAPI } from '~/api/auth-api'
import { userAPI } from '~/api/user-api'
import type { User, UserFormData } from '~/scheme/z_user'

export const useUserStore = defineStore('user', () => {
  const { decodeAccessToken, setAccessToken, getAccessToken, cleanAccessToken } = useTokens()
  const userState = reactive<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_new: '',
    avatar: '',
    fullName: '',
  })
  const user = ref<User>()
  const userFormData = ref({ ...userState })
  const loading = ref(false)

  const isLoggedIn = computed(() => !!user.value?.id)
  const isAuthenticated = computed(() => !!getAccessToken())

  watch(
    () => userFormData.value.avatar,
    () => {
      if (userFormData.value.avatar && user.value) user.value.avatar = userFormData.value.avatar
    }
  )

  function setUser() {
    if (!isAuthenticated.value) return console.log('fail Auth')
    user.value = decodeAccessToken()
    if (!user.value?.id) return console.log('fail decode')

    const { email, avatar, roles, id, fullName } = user.value
    userFormData.value = { ...userFormData.value, id, email, avatar, roles, fullName }
  }

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

  async function updateUserInfo(body: UserFormData) {
    const { data } = await userAPI.update(body)
    if (!data.value) return false
    const { accessToken } = data.value
    setAccessToken(accessToken)
    user.value = decodeAccessToken()
    return true
  }

  const storeRefs = () => ({ loading, user, isLoggedIn, isAuthenticated, userFormData })

  return { login, storeRefs, tryRefreshToken, logout, setUser, updateUserInfo }
})
