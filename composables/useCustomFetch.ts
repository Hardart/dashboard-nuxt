import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { TokensResponse, CustomResponse } from '~/types/fetch'
import type { FetchContext, FetchResponse } from 'ofetch'
import defu from 'defu'

type onResponseError = (ctx: FetchContext & { response: FetchResponse<ResponseType> }) => void | Promise<void>
type onRequest = (ctx: FetchContext) => void | Promise<void>

export const useCustomFetch = async <T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) => {
  const toast = useToast()
  const { getAccessToken, setAccessToken, decodeAccessToken, cleanAccessToken } = useTokens()

  const onRefreshResponseError: onResponseError = async ({ response }) => {
    if (response.status !== 401) return
    cleanAccessToken()
    await navigateTo('/login')
  }

  const onDefaultResponseError: onResponseError = async ({ response }) => {
    switch (response.status) {
      case 401:
        const res = await $fetch<CustomResponse<TokensResponse>>('/refresh', refreshOptions)
        if (res.status === 'success') setAccessToken(res.data.accessToken)
        break

      case 500:
        showError({ message: response.statusText, statusCode: 500 })
        break
      default:
        toast.add({ title: response._data.message, timeout: 10000, color: 'red', icon: 'i-heroicons-x-circle-20-solid' })
        console.log(response._data)
    }
  }

  const onDefaultRequest: onRequest = ({ options }) => {
    options.headers = { ...options.headers, authorization: `Bearer ${getAccessToken()}` }
  }

  const refreshOptions: NitroFetchOptions<NitroFetchRequest> = {
    baseURL: '/dashboard',
    credentials: 'include',
    method: 'POST',
    onResponseError: onRefreshResponseError,
  }

  const defaultOptions: NitroFetchOptions<NitroFetchRequest> = {
    baseURL: '/dashboard',
    onRequest: onDefaultRequest,
    onResponseError: onDefaultResponseError,
    retryStatusCodes: [401],
    method: 'POST',
    retry: 1,
  }

  const fetchParams = defu(options, defaultOptions)

  try {
    const response = (await $fetch(url, fetchParams)) as CustomResponse<T>
    if (response.status === 'success') return { data: toRef(response.data) }
    else return { data: toRef(null), error: { message: response.message, status: response.status, errors: response.errors } }
  } catch (error) {
    return { data: toRef(null), error }
  }
}