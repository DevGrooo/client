<template>
  <div v-if="user" class="user">
    <div class="photo">
      <img src="~/assets/img/default-avatar.png" />
    </div>
    <div class="info">
      <a data-toggle="collapse" href="#collapseExample" class="collapsed" :aria-expanded="show" @click.prevent="toggleShow">
        <span>
          {{ user.fullname }}
          <b v-if="selfRoles.length > 0" class="caret"></b>
        </span>
      </a>
      <div v-if="selfRoles.length > 0" class="collapse" :class="{ 'collapse': true, 'show': show }">
        <ul class="nav">
          <li v-for="(role, index) in selfRoles" :key="index">
            <nuxt-link class="profile-dropdown" :to="localePath(role.code)">
              <span class="sidebar-mini"><i class="nc-icon nc-simple-delete" /></span>
              <span class="sidebar-normal">{{ role.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    },
    selfRoles () {
      return this.getSelfRoles()
    }
  },
  methods: {
    getSelfRoles () {
      return this.$store.state.user.myProfile.user.self_roles
    },
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>
