import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { TokensResponse, CustomResponse } from '~/types/fetch'
import type { FetchContext, FetchResponse } from 'ofetch'
import defu from 'defu'

type onResponseError = (ctx: FetchContext & { response: FetchResponse<ResponseType> }) => void | Promise<void>
type onRequest = (ctx: FetchContext) => void | Promise<void>

export const useCustomFetch = async <T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) => {
  const { getAccessToken, setAccessToken, cleanAccessToken } = useTokens()
  const errorData = ref()

  const onRefreshResponseError: onResponseError = async ({ response }) => {
    if (response.status !== 401) return
    cleanAccessToken()
    useCustomToast('Время сессии истекло, пожалуйста, введите снова данные от своей учетной записи', 'fail')
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
        useCustomToast(response._data.message, 'fail')
        errorData.value = response._data
    }
  }

  const onDefaultRequest: onRequest = ({ options }) => {
    options.headers = {
      ...options.headers,
      authorization: `Bearer ${getAccessToken()}`
    }
  }

  const refreshOptions: NitroFetchOptions<NitroFetchRequest> = {
    baseURL: '/v1/dashboard',
    credentials: 'include',
    method: 'POST',
    onResponseError: onRefreshResponseError
  }

  const defaultOptions: NitroFetchOptions<NitroFetchRequest> = {
    baseURL: '/v1/dashboard',
    onRequest: onDefaultRequest,
    onResponseError: onDefaultResponseError,
    retryStatusCodes: [401],
    method: 'POST',
    retry: 1
  }

  const fetchParams = defu(options, defaultOptions)

  try {
    const response = await $fetch<CustomResponse<T>>(url, fetchParams)
    if (response.status === 'success') return { data: toRef(response.data), status: response.status }
    else
      return {
        data: toRef(null),
        error: {
          message: response.message,
          status: response.status,
          errors: response.errors
        }
      }
  } catch (error) {
    return { data: toRef(null), error: toValue(errorData) }
  }
}
