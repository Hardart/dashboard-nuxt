import { defineNuxtModule, addComponent } from '@nuxt/kit'
import { resolve } from 'path'

export default defineNuxtModule({
  // Имя вашего модуля
  meta: {
    name: 'test'
  },
  // Стандартные опции модуля
  defaults: {},

  // Функция, которая будет выполнена при регистрации модуля
  setup() {
    // Регистрируем компонент
    addComponent({
      name: 'HdrtTest',
      filePath: resolve(__dirname, 'test/components/HdrtTest.vue'),
      priority: undefined
    })
  }
})
