export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUserStore().storeRefs()

  if (!user.value) await navigateTo('/login')
  if (!user.value?.roles.includes('hero')) return navigateTo('/')
})
