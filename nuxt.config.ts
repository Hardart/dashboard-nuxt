// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-tiptap-editor',
    '@samk-dev/nuxt-vcalendar',
    '~/modules/dragImage'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons', 'material-symbols'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  runtimeConfig: {
    public: {
      IMAGE_HOST: 'http://localhost:3068/images/home' // DEV LOCAL
      // IMAGE_HOST: '' // DEV HOST
    }
  },
  pinia: { storesDirs: ['./store/**'] },
  tiptap: { prefix: 'Tiptap' },
  tailwindcss: { viewer: false },
  devtools: { enabled: false },

  routeRules: {
    '/v1/dashboard/**': {
      proxy: process.env.BASE_URL
    }
  }
})
