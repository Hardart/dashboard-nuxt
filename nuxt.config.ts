// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', 'nuxt-tiptap-editor'],
  ui: {
    icons: ['heroicons', 'simple-icons', 'material-symbols'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
  devtools: {
    enabled: true,
  },
  routeRules: {
    '/api/**': {
      proxy: process.env.BASE_URL,
    },
    '/admin/**': {
      proxy: process.env.ADMIN_URL,
    },
  },
})
