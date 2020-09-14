<template>
  <div class="container">
    <div class="col-md-4 col-sm-6 ml-auto mr-auto">
      <div class="form">
        <form class="card card-login" @submit.prevent="login">
          <div class="card-header">
            <h3 class="header text-center">
              {{ $t('auth.login') }}
            </h3>
          </div>
          <div class="card-body">
            <div class="card-body">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="form-group">
                <label>{{ $t('auth.username') }}</label>
                <input
                  v-model="params.username"
                  required
                  type="text"
                  placeholder="Enter username"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('auth.password') }}</label>
                <input
                  v-model="params.password"
                  required
                  type="password"
                  placeholder="Enter password"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          <div class="card-footer ml-auto mr-auto">
            <button v-if="loading" type="button" class="btn btn-warning btn-wd">
              <i class="fa fa-spin fa-spinner" />
            </button>
            <button v-else class="btn btn-warning btn-wd">
              {{ $t('auth.login') }}
            </button>
            <button class="btn btn-light btn-wd">
              <nuxt-link to="/auth/forgot-password">
                {{ $t('auth.forgot password') }}
              </nuxt-link>
            </button>
          </div>
        </form>
        <FlashMessage />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    loading: false,
    error: '',
    params: {
      username: 'admin',
      password: '123456'
    },
    messageId: null
  }),
  created () {
    if (this.$store.state.globalErrors.includes('401')) {
      this.messageId = this.flashMessage.show({
        status: 'warning',
        title: this.$t('auth.Session timeout title'),
        message: this.$t('auth.Session timeout message')
      })
      this.$store.dispatch('setError', [])
    }
  },
  methods: {
    async login () {
      if (this.messageId) {
        this.flashMessage.deleteMessage(this.messageId)
      }
      try {
        this.loading = true
        await this.$auth.loginWith('api', this.params)
        this.loading = false
        this.$store.commit('user/SET_MENU', [])
        this.$router.push(this.localePath('/home'))
      } catch (err) {
        this.error = err.error || 'Thông tin đăng nhập không chính xác'
        this.loading = false
      }
    }
  }
}
</script>
