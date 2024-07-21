import { defineNuxtModule, addComponent } from '@nuxt/kit'
import { resolve } from 'path'

export default defineNuxtModule({
  // Имя вашего модуля
  meta: {
    name: 'drag image'
  },
  // Стандартные опции модуля
  defaults: {},

  // Функция, которая будет выполнена при регистрации модуля
  setup() {
    // Регистрируем компонент
    addComponent({
      name: 'HdrtDragImage',
      filePath: resolve(__dirname, 'dragImage/components/HdrtDrag.vue')
    })
  }
})
