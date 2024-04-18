export const createArrayOfNumbers = (count: number, startFrom: number = 0) =>
  new Array(count).fill('').map((_, index) => index + startFrom)
