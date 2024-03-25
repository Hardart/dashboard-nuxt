export default defineNuxtRouteMiddleware(async to => {
  const token = useLocalStorage('auth_access', () => undefined)

  const { setUser } = useUserStore()
  setUser()

  if (token.value && to.name === 'login') return navigateTo('/')

  if (!token.value && to.name !== 'login') {
    abortNavigation()
    return navigateTo('/login')
  }
})
