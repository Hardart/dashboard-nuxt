export const parseHtml = (input: string) => {
  input.match(/\/images[^"]*/g)?.forEach((string) => {
    input = input.replace(string, correctImageSrc(string))
  })
  return input
}
