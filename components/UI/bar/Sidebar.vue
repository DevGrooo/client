<template>
  <div class="sidebar" data-color="main-color">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="https://www.creative-tim.com" class="simple-text logo-mini"></a>
        <a href="https://www.creative-tim.com" class="simple-text logo-normal">{{ appName }}</a>
      </div>
      <profile-sidebar />
      <ul v-if="menus.length" class="nav">
        <li
          v-for="(menu, index) in menus"
          :key="index"
          :class="{ 'nav-item': true }"
        >
          <item-sidebar
            ref="items"
            :path="menu.path"
            :icon="menu.icon"
            :image-src="menu.imageSrc"
            :index="index"
            :active="menu.active"
            @setItemActive="setItemActive"
          >{{ menu.name }}</item-sidebar>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/UI/bar/ProfileSidebar'
import ItemSidebar from '@/components/UI/bar/ItemSidebar'

export default {
  components: {
    ItemSidebar,
    ProfileSidebar
  },
  data () {
    return {
      appName: process.env.APP_NAME
    }
  },
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    },
    menus () {
      const menus = this.getMenus(this.$store.state.user.menus)
      return menus
    }
  },
  async mounted () {
    await this.$store.dispatch('user/setMyProfile', { axios: this.$axios, token: this.$auth.getToken('api'), locale: this.$i18n.locale })
  },
  methods: {
    async logout () {
      if (confirm(this.$t('auth.Do you want to log out?'))) {
        await this.$auth.logout()
        this.$router.push('/auth/login')
      }
    },
    setItemActive (index) {
      for (let i = 0; i < this.menus.length; i++) {
        if (i !== index) {
          this.$refs.items[i].removeActive()
        }
      }
    },
    getMenus (menus) {
      for (let i = 0; i < menus.length; i++) {
        menus[i].icon = 'nc-icon nc-app'
        menus[i].imageSrc = this._getImageSrc(menus[i].code)
      }
      return menus
    },
    _getImageSrc (code) {
      return code !== '' ? 'img/left-icons/' + code + '.png' : ''
    }
  }
}
</script>
