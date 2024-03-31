export default defineNuxtRouteMiddleware(async to => {
  const { setUserDataFromToken } = useUserStore()
  const token = useLocalStorage('auth_access', () => undefined)
  setUserDataFromToken()
  if (token.value && to.name === 'login') return navigateTo('/')

  if (!token.value && to.name !== 'login') {
    abortNavigation()
    return navigateTo('/login')
  }
})
