<template>
  <div v-if="user" class="row">
    <div class="col-md-8">
      <b-form
        name="formUpdate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('profile.Fullname') }}</label>
              <div class="col-md-8">
                <b-input
                  name="fullname"
                  type="text"
                  :value="user.fullname"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('profile.Email') }}</label>
              <div class="col-md-8">
                <b-input
                  name="email"
                  type="text"
                  :value="user.email"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('profile.Mobile') }}</label>
              <div class="col-md-8">
                <b-input
                  name="mobile"
                  type="text"
                  :value="user.mobile"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('profile.Update Profile') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
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
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mobile } from '@/components/UI/form/BValidate'
import { callApiUserProfileUpdate } from '@/apis/user'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'

export default {
  name: 'ProfileUpdate',
  components: {
    BForm,
    BInput
  },
  data () {
    return {
      validates: {
        fullname: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('profile.validates.Fullname is required'),
            maxLength: this.$t('profile.validates.Fullname maxlength 255')
          }
        },
        email: {
          rules: { required, maxLength: maxLength(255), email },
          messages: {
            required: this.$t('profile.validates.Email is required'),
            maxLength: this.$t('profile.validates.Email maxlength 255'),
            email: this.$t('profile.validates.Email invalid')
          }
        },
        mobile: {
          rules: { mobile },
          messages: {
            mobile: this.$t('profile.validates.Mobile invalid')
          }
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiUserProfileUpdate(this, params)
      if (result.status === true) {
        await this.$store.dispatch('user/setMyProfile', { axios: this.$axios, token: this.$auth.getToken('api'), locale: this.$i18n.locale })
        this.flashMessage.success({
          title: this.$t('profile.Update Success'),
          message: this.$t('profile.Update Success')
        })
        this.$router.push(this.localePath('/profile'))
      } else {
        this.flashMessage.error({
          title: this.$t('profile.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
