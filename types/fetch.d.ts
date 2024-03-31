import type { Article } from '~/scheme/z_article'
import type { Category } from '~/scheme/z_category'
import type { Program } from '~/scheme/z_program'

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

export type CustomResponse<T> =
  | {
    status: 'success'
    data: T
  }
  | {
    status: 'fail' | 'error'
    message: string
    errors: object[]
  }

export declare module ResponseApi {
  export type ArticleList = { articles: Article[], tags: string[] }
  export type ArticleSingle = { article: Article }
  export type CategoryList = { categories: Category[] }
  export type CategorySingle = { category: Category }
  export type FileList = { files: string[] }
  export type FileSingle = { path: string }
  export type ProgramList = { programs: Program[] }
}
