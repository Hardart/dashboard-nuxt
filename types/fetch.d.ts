export interface CustomFetchOptions {
  url: string
  method?: 'POST' | 'GET'
  body?: object
  query?: object
}

export interface TokensResponse {
  accessToken: string
  refreshToken: string
}
