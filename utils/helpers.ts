export const createArrayOfNumbers = (count: number, startFrom: number = 0) =>
  new Array(count).fill('').map((_, index) => index + startFrom)

export function isUndefined<T>(input: Ref<T> | undefined): Ref<T> {
  if (typeof input === 'undefined') throw createError(`${input} is undefined`)
  return input
}

export function tryInject<T>(key: string): Ref<T> {
  const data = inject<Ref<T>>(key)
  if (typeof data === 'undefined') throw createError(`Item with KEY: ${key} is not provided`)
  return data
}

export function correctImageSrc(src: string | undefined) {
  if (typeof src === 'undefined') return undefined
  const config = useRuntimeConfig()
  src = src.replace('assets', '')
  return config.public.IMAGE_HOST + src
}

export const delay = (ms: number = 0) => new Promise((res) => setTimeout(res, ms))
