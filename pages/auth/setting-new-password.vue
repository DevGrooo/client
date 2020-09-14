<template>
  <div class="container">
    <div class="col-md-4 col-sm-6 ml-auto mr-auto">
      <div class="form">
        <form class="card card-login" @submit.prevent="changePass">
          <div class="card-header">
            <h3 class="header text-center">
              {{ $t('auth.password') }}
            </h3>
          </div>
          <div class="card-body">
            <div class="card-body">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="form-group">
                <label>{{ $t('auth.old password') }}</label>
                <input
                  v-model="user.params.old_password"
                  required
                  type="password"
                  placeholder="Enter old password"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('auth.new password') }}</label>
                <input
                  v-model="user.params.new_password"
                  required
                  type="password"
                  placeholder="Enter new password"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('auth.confirm password') }}</label>
                <input
                  v-model="user.params.confirm_password"
                  required
                  type="password"
                  placeholder="Enter confirm password"
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
              {{ $t('auth.save') }}
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
  data: () => ({
    loading: false,
    error: '',
    user: {
      params: {
        old_password: null,
        new_password: null,
        confirm_password: null
      }
    }
  }),
  methods: {
    async changePass () {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: this.user
        })
        this.loading = false
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.error = err.error || 'Thông tin đăng nhập không chính xác'
        this.loading = false
      }
    }
  }
}
</script>
