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
      IMAGE_HOST: ''
    }
  },
  pinia: {
    storesDirs: ['./store/**']
  },
  tiptap: {
    prefix: 'Tiptap' //prefix for Tiptap imports, composables not included
  },
  devtools: {
    enabled: true
  },
  vite: {
    server: {
      hmr: {
        port: 8001
      }
    }
  },
  routeRules: {
    '/v1/dashboard/**': {
      proxy: process.env.BASE_URL
    }
  }
})
