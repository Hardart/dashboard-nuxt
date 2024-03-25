import { jwtDecode } from 'jwt-decode'
import type { User } from '~/scheme/z_user'
export const useTokens = () => {
  const LOCAL_ACCESS_NAME = 'auth_access'

  const getAccessToken = () => localStorage.getItem(LOCAL_ACCESS_NAME)

  const setAccessToken = (token: string) => localStorage.setItem(LOCAL_ACCESS_NAME, token)

  const decodeAccessToken = () => {
    const token = getAccessToken()
    return token ? jwtDecode<User>(token, { header: false }) : undefined
  }

  const cleanAccessToken = () => localStorage.removeItem(LOCAL_ACCESS_NAME)

  return { decodeAccessToken, setAccessToken, cleanAccessToken, getAccessToken }
}
