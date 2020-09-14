export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Montserrat:400,700,200'
      },
      {
        rel: 'stylesheet',
        href:
          '//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          '/css/light-bootstrap-dashboard.css?v=2.0.0'
      },
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/custom_t.css' },
      { rel: 'stylesheet', href: '/css/custom_last.css' }
    ],
    script: [
      { src: '/js/core/jquery.3.2.1.min.js', ssr: false },
      { src: '/js/core/popper.min.js', ssr: false },
      { src: '/js/core/bootstrap.min.js', ssr: false },
      { src: '/js/plugins/bootstrap-switch.js', ssr: false },
      { src: '/js/light-bootstrap-dashboard.js?v=2.0.0', ssr: false }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/theme.css',
    'vue-multiselect/dist/vue-multiselect.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/vue-flash-message.js', mode: 'client' },
    { src: '~/plugins/vue-tables-2.js', ssr: true },
    { src: '~/plugins/vue-tags-input', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~/plugins/vue2-editor.js', ssr: false },
    // { src: '~plugins/axios.js' },
    { src: '~/plugins/vue2-editor.js', ssr: false },
    { src: '~plugins/multiselect.js' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'nuxt-i18n'
  ],

  /**
   * https://i18n.nuxtjs.org/basic-usage.html#nuxt-link
   */
  i18n: {
    locales: [
      { code: 'vi', label: 'Tiếng Việt', file: 'vi.js' },
      { code: 'en', label: 'English', file: 'en.js' }
      // { code: 'jp', label: '日本人', file: 'jp.js' }
    ],
    defaultLocale: process.env.LANGUAGE,
    lazy: true,
    langDir: 'lang/'
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // proxy: true
    // credentials: true,
    // proxyHeaders: true,
    baseUrl: process.env.API_BASE_URL
  },

  // proxy: {
  //   '/api/': {
  //     target: process.env.PROXY_TARGET,
  //     pathRewrite: { '^/api/': '' }
  //   }
  // },

  router: {
    base: '/',
    middleware: ['auth']
  },

  auth: {
    strategies: {
      api: {
        _scheme: '~/schemes/apiScheme',
        endpoints: {
          login: {
            url: process.env.API_BASE_URL + '/user/login',
            method: 'post'
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/home'
    },
    plugins: ['~/plugins/auth.js']
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: ['@nuxtjs/auth'],
    vendor: ['@johmun/vue-tags-input', 'vue2-editor']
  }
}
