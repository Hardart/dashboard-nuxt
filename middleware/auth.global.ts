export default defineNuxtRouteMiddleware(async to => {
  const { setUserDataFromToken } = useUserStore()
  const token = useLocalStorage('auth_access', () => undefined)
  if (token.value && to.name === 'login') return navigateTo('/')

  if (token.value) setUserDataFromToken()

  if (!token.value && to.name !== 'login') {
    abortNavigation()
    return navigateTo('/login')
  }
})
