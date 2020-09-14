<template>
  <div v-if="user" class="row">
    <div class="col-md-8 col-sm-6">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <label>{{ $t('profile.User Group') }}</label>
                <input type="text" class="form-control" disabled :value="user.user_group_name" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <label>{{ $t('profile.Username') }}</label>
                <input type="text" class="form-control" disabled :value="user.username" />
              </div>
            </div>
            <div class="col-md-7 pl-1">
              <div class="form-group">
                <label>{{ $t('profile.Email') }}</label>
                <input type="email" class="form-control" disabled :value="user.email" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <div class="form-group">
                <label>{{ $t('profile.Fullname') }}</label>
                <input type="text" class="form-control" disabled :value="user.fullname" />
              </div>
            </div>
            <div class="col-md-4 pl-1">
              <div class="form-group">
                <label>{{ $t('profile.Mobile') }}</label>
                <input type="text" class="form-control" disabled :value="user.mobile" />
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <nuxt-link class="btn btn-primary btn-fill" :to="localePath('/profile/update')">{{ $t('profile.Update Profile') }}</nuxt-link>
          <nuxt-link class="btn btn-primary btn-fill" :to="localePath('/profile/change-password')">{{ $t('profile.Change Password') }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card card-user">
        <div class="card-header no-padding">
          <div class="card-image">
            <img src="~/assets/img/full-screen-image-3.jpg" />
          </div>
        </div>
        <div class="card-body">
          <div class="author">
            <a href="#">
              <img class="avatar border-gray" src="~/assets/img/default-avatar.png" />
              <h5 class="card-title">{{ user.fullname }}</h5>
            </a>
            <p class="card-description">{{ user.email }}</p>
          </div>
          <p class="card-description text-center"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileIndex',
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    }
  }
}
</script>
