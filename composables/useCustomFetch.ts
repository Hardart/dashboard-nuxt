import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import defu from 'defu'
import { API_URLs } from '@/scheme/enums'
import type { TokensResponse } from '~/types/fetch'
const { getAccessToken, setAccessToken, decodeAccessToken, cleanAccessToken } = useTokens()

const refreshOptions: NitroFetchOptions<NitroFetchRequest> = {
  credentials: 'include',
  async onResponseError({ response }) {
    if (response.status == 401) {
      cleanAccessToken()
      await navigateTo('/login')
    }
  },
}

export const useCustomFetch = async <T>(url: (typeof API_URLs)[number], options: NitroFetchOptions<NitroFetchRequest> = {}) => {
  const toast = useToast()
  const data = ref<T>()

  const defaults: NitroFetchOptions<NitroFetchRequest> = {
    onRequest({ options }) {
      options.headers = { ...options.headers, authorization: `Bearer ${getAccessToken()}` }
    },
    async onResponseError({ response }) {
      if (response.status == 500) showError({ message: response.statusText, statusCode: 500 })
      else if (response.status == 401) {
        const tokens = await $fetch<TokensResponse>('/admin/refresh', refreshOptions)

        setAccessToken(tokens.accessToken)
        data.value = decodeAccessToken() as T
      } else if (response._data.message)
        toast.add({ title: response._data.message, timeout: 10000, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
    },
    retryStatusCodes: [401],
    method: 'POST',
    retry: 1,
  }

  const params = defu(options, defaults)

  try {
    data.value = (await $fetch(url, params)) as T
    return { data }
  } catch (error) {
    return { data, error }
  }
}
