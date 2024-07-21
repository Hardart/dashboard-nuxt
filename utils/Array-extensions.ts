// Добавляем метод к прототипу Array
Array.prototype.capitalizeWords = function (): string[] {
  return this.map((word: string) =>
    word
      .split(' ')
      .map((subWord) => subWord.charAt(0).toUpperCase() + subWord.slice(1))
      .join(' ')
  )
}
