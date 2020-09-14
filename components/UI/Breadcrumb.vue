<template>
  <nav v-if="crumbs.length > 0" aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li v-for="(item, index) in crumbs" :key="index" :class="{'breadcrumb-item': true, 'active': item.active}" aria-current="page">
        <span v-if="item.active">{{ $t(item.name) }}</span>
        <nuxt-link v-else :to="item.path">{{ $t(item.name) }}</nuxt-link>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  computed: {
    crumbs () {
      const crumbs = this.getCrumbs()
      return crumbs
    }
  },
  methods: {
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
