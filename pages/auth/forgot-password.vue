<template>
  <div class="container">
    <div class="col-md-4 col-sm-6 ml-auto mr-auto">
      <div class="form">
        <form class="card card-login" @submit.prevent="forgot">
          <div class="card-header">
            <h3 class="header text-center">
              {{ $t('auth.forgot password') }}
            </h3>
          </div>
          <div class="card-body">
            <div class="card-body">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="form-group">
                <label>{{ $t('auth.email') }}</label>
                <input
                  v-model="user.params.email"
                  required
                  type="email"
                  placeholder="Enter email"
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
              {{ $t('auth.get a new password') }}
            </button>
            <button class="btn btn-light btn-wd">
              <nuxt-link to="/">
                {{ $t('auth.cancel') }}
              </nuxt-link>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  auth: 'guest',
  data: () => ({
    loading: false,
    error: '',
    user: {
      params: {
        email: null
      }
    }
  }),
  methods: {
    async forgot () {
      try {
        this.loading = true
        const that = this
        await this.$axios
          .put('/user/request_reset_password', this.user)
          .then(function (response) {
            console.log(response, response.data.status, response.status)

            if (response.status === 200) {
              that.flashMessage.success({
                title: 'Success Message Title',
                message: 'Yêu cầu lấy lại mật khẩu đã được xử lý thành công'
              })
              that.$router.push('/auth/login')
            }
          })

        this.loading = false
      } catch (err) {
        console.log(err)
        this.error = err.error || 'Thông tin đăng nhập không chính xác'
        this.loading = false
      }
    }
  }
}
</script>
