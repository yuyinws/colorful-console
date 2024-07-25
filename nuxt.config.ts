import { env } from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/ui',
    ['nuxt-module-cli-shortcuts', {
      rawMode: true,
    }],
    'unplugin-turbo-console/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  appConfig: {
    __IS_DEV__: env.NODE_ENV === 'development',
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
    },
  },
  app: {
    head: {
      title: 'Colorful Console',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  ssr: false,
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
})
