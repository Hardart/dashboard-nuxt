import type { Article } from '~/scheme/z_article'
import type { Category } from '~/scheme/z_category'
import type { Program } from '~/scheme/z_program'
import type { Slide } from '~/scheme/z_slide'
import type { Track } from '~/scheme/z_track'
import type { User } from '~/scheme/z_user'
import type { Contact, Mail, Phone } from './contact'

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
  type LoginData = { accessToken: string; user: User }
  type RegistrationData = { user: User }
  type ArticleList = { articles: Article[]; tags: string[] }
  type ArticleSingle = { article: Article }
  type CategoryList = { categories: Category[] }
  type CategorySingle = { category: Category }
  type FileList = { files: string[] }
  type FileSingle = { path: string }
  type ProgramList = { programs: Program[]; hosts: User[] }
  type ProgramSngle = { program: Program }
  type UserList = { users: User[] }
  type TrackList = { tracks: Track[] }
  type SlideList = { slides: Slide[] }
  type SlideSingle = { slide: Slide }
  type FooterData = { contacts: Contact[] }
  type BaseData = { phones: Phone[]; emails: Mail[] }
  type PhoneSingle = { phone: Phone }
  type MailSingle = { email: Mail }
}
