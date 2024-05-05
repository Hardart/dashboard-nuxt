// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', 'nuxt-tiptap-editor', '@samk-dev/nuxt-vcalendar'],
  ui: {
    icons: ['heroicons', 'simple-icons', 'material-symbols'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  runtimeConfig: {
    public: {
      BASE_URL: 'http://localhost:3068'
    }
  },
  pinia: {
    storesDirs: ['./store/**']
  },
  tiptap: {
    prefix: 'Tiptap' //prefix for Tiptap imports, composables not included
  },
  devtools: {
    enabled: false
  },
  routeRules: {
    '/v1/dashboard/**': {
      proxy: process.env.BASE_URL
    },
    
  }
})
