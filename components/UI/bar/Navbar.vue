<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg" color-on-scroll="500">
    <div class="container-fluid">
      <a class="navbar-brand" href="#pablo">{{ pageTitle }}</a>
      <div id="navigation" class="collapse navbar-collapse justify-content-end">
        <nav v-if="crumbs.length > 0" aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb">
            <li v-for="(item, index) in crumbs" :key="index" :class="{'breadcrumb-item': true, 'active': item.active}" aria-current="page">
              <span v-if="item.active">{{ $t(item.name) }}</span>
              <nuxt-link v-else :to="item.path">{{ $t(item.name) }}</nuxt-link>
            </li>
          </ol>
        </nav>
        <ul class="navbar-nav ml-auto">
          <li v-if="locales.length" class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="no-icon">{{ language }}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <nuxt-link
                v-for="(item, index) in locales"
                :key="index"
                :class="{'dropdown-item': true, 'text-danger': item.active}"
                :href="'#' + item.label"
                :to="switchLocalePath(item.code)"
              >
                {{ item.label }}
              </nuxt-link>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#logout" @click.prevent="logout">
              <span class="no-icon">{{ $t('common.Log out') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      language: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    },
    locales () {
      return this.getLocales()
    },
    crumbs () {
      const crumbs = this.getCrumbs()
      return crumbs
    }
  },
  methods: {
    async logout () {
      if (confirm(this.$t('auth.do you want to log out?'))) {
        await this.$auth.logout()
      }
    },
    getLocales () {
      const locales = this.$i18n.locales
      for (let i = 0; i < locales.length; i++) {
        if (locales[i].code === this.$i18n.locale) {
          locales[i].active = true
          this.language = locales[i].label
        } else {
          locales[i].active = false
        }
      }
      return locales
    },
    getCrumbs () {
      const crumbs = []
      const route = this._getCurrentRoute()
      if (route !== null) {
        const paths = []
        this._setCrumbs(crumbs, route, true, paths)
        crumbs.reverse()
      }
      return crumbs
    },
    _getCurrentRoute () {
      let route = null
      this.$route.matched.map((item, i, { length }) => {
        if (route === null) {
          route = item
        } else if (route.path.length < item.path.length) {
          route = item
        }
      })
      return route
    },
    _getCrumbPath (route) {
      let path = ''
      // replace :param
      path = route.path.replace(/\/:[^/:]*$/, '')
      // replace /$
      path = path.replace(/\/$/, '')
      return path
    },
    _setCrumbs (crumbs, route, active, paths) {
      const path = this._getCrumbPath(route)
      if (paths.includes(path) === false) {
        paths.push(path)
        crumbs.push({
          name: this._getCrumbName(path),
          path,
          active
        })
      }
      if (typeof route.parent !== 'undefined') {
        this._setCrumbs(crumbs, route.parent, false, paths)
      }
    },
    _getCrumbName (path) {
      let name = 'route.'
      const locale = this.$i18n.locale
      path = path.replace('/' + locale + '/', '/')
      name = name + path
      return name
    }
  }
}
</script>
