import type { CustomFetchOptions } from '~/types/fetch'

export const useCustomFetch = async <T>({ url, method = 'GET', body, query }: CustomFetchOptions, pending: Ref<boolean> = ref(false)) => {
  const toast = useToast()
  pending.value = true
  try {
    const response = await $fetch<T>(url, {
      method,
      body,
      query,
      async onResponseError({ response }) {
        if (response.status == 500) showError({ message: response.statusText, statusCode: response.status })
        else if (response._data.message)
          toast.add({ title: response._data.message, timeout: 10000, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
      },
    })
    return response
  } catch (error) {
    console.log(error)
    return undefined
  } finally {
    pending.value = false
  }
}
