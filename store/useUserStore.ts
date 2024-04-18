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
    avatar: ''
  })
  const user = ref<User>()
  const userFormData = ref({ ...userState })
  const loading = ref(false)

  const isAdmin = computed(() => user.value?.roles.includes('hero' || 'admin'))
  const isLoggedIn = computed(() => !!user.value?.id)

  watch(
    () => userFormData.value.avatar,
    () => {
      if (userFormData.value.avatar && user.value) user.value.avatar = userFormData.value.avatar
    }
  )

  function setUserDataFromToken() {
    if (isLoggedIn.value) return
    user.value = decodeAccessToken()
    setUserFormData()
  }

  function setUserFormData() {
    if (!user.value?.id) return console.warn('NO USER')
    const { email, avatar, roles, id, firstName, lastName } = user.value
    userFormData.value = { ...userFormData.value, id, email, avatar, roles, firstName, lastName }
  }

  async function login(loginData: UserFormData) {
    loading.value = true
    const { data } = await authAPI.login(loginData)

    loading.value = false
    if (!data.value) return false
    setAccessToken(data.value.accessToken)
    user.value = data.value.user
    setUserFormData()
    return true
  }

  async function tryRefreshToken() {
    if (!getAccessToken()) return false
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

  const storeRefs = () => ({ loading, user, isLoggedIn, userFormData, isAdmin })

  return { login, storeRefs, tryRefreshToken, logout, setUserDataFromToken, setUserFormData, updateUserInfo }
})
