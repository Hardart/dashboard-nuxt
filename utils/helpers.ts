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
  return process.dev ? 'http://localhost:3068' + src : src
}
