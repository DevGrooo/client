<template>
  <div class="row">
    <div class="col-md-8">
      <b-form
        name="formChangePassword"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-body">
            <div class="row">
              <label class="col-md-4 col-form-label">{{ $t('profile.Current Password') }}</label>
              <div class="col-md-8">
                <b-input
                  name="current_password"
                  type="password"
                  :value="form.current_password"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label">{{ $t('profile.New Password') }}</label>
              <div class="col-md-8">
                <b-input
                  name="new_password"
                  type="password"
                  :value="form.new_password"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-4 col-form-label">{{ $t('profile.Confirm Password') }}</label>
              <div class="col-md-8">
                <b-input
                  name="confirm_password"
                  type="password"
                  :value="form.confirm_password"
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('profile.Change Password') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
    <div v-if="user" class="col-md-4">
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { callApiUserProfileChangePassword } from '@/apis/user'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'

export default {
  name: 'ProfileChangePassword',
  components: {
    BForm,
    BInput
  },
  data () {
    return {
      form: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      },
      validates: {
        current_password: {
          rules: { required, minLength: minLength(6) },
          messages: {
            required: this.$t('profile.validates.Current Password is required'),
            minLength: this.$t('profile.validates.Current Password minlength 6')
          }
        },
        new_password: {
          rules: { required, minLength: minLength(6) },
          messages: {
            required: this.$t('profile.validates.New Password is required'),
            minLength: this.$t('profile.validates.New Password minlength 6')
          }
        },
        confirm_password: {
          rules: {
            required,
            minLength: minLength(6),
            sameAsNewPassword: sameAs('new_password')
          },
          messages: {
            required: this.$t('profile.validates.Confirm Password is required'),
            minLength: this.$t('profile.validates.Confirm Password minlength 6'),
            sameAsNewPassword: this.$t('profile.validates.Confirm Password not compare')
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
      const result = await callApiUserProfileChangePassword(this, params)
      if (result.status === true) {
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
