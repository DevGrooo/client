<template>
  <div v-if="user !== null" class="row">
    <div class="col-md-12">
      <b-form
        name="formUpdate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('user.Update User') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="user_id" :value="user.id.toString()" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.User Group') }}</label>
              <div class="col-md-8">
                <b-select name="user_group_id" :disabled="true" :value="user.user_group_id" :options="user_groups" />
              </div>
            </div>
            <div v-if="refs !== null" class="row">
              <label class="col-md-3 col-form-label">{{ ref_name }}</label>
              <div class="col-md-8">
                <b-select name="ref_id" :disabled="true" :value="user.ref_id.toString()" :options="refs" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Username') }}</label>
              <div class="col-md-8">
                <b-input name="username" type="text" :disabled="true" :value="user.username" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Fullname') }}</label>
              <div class="col-md-8">
                <b-input name="fullname" type="text" :value="user.fullname" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Email') }}</label>
              <div class="col-md-8">
                <b-input name="email" type="text" :value="user.email" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Mobile') }}</label>
              <div class="col-md-3">
                <b-input name="mobile" type="text" :value="user.mobile" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('user.Update User') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mobile } from '@/components/UI/form/BValidate'
import { callApiUserUpdate, callApiUserGetRefList, callApiUserGetUserGroupList, callApiUserDetail } from '@/apis/user'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BInputHidden from '@/components/UI/form/BInputHidden'
import BSelect from '@/components/UI/form/BSelect'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BForm,
    BInput,
    BInputHidden,
    BSelect
  },
  data () {
    return {
      user: null,
      user_groups: [],
      status: [],
      refs: null,
      ref_name: '',
      validates: {
        fullname: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('user.validates.Fullname is required'),
            maxLength: this.$t('user.validates.Fullname maxlength 255')
          }
        },
        email: {
          rules: { required, maxLength: maxLength(255), email },
          messages: {
            required: this.$t('user.validates.Email is required'),
            maxLength: this.$t('user.validates.Email maxlength 255'),
            email: this.$t('user.validates.Email invalid')
          }
        },
        mobile: {
          rules: { required, mobile },
          messages: {
            required: this.$t('user.validates.Mobile is required'),
            mobile: this.$t('user.validates.Mobile invalid')
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiUserDetail(this, { user_id: this.$route.params.id })
    if (data.status === true) {
      this.user = data.response
      this.user_groups = await callApiUserGetUserGroupList(this)
      this.setRefs(this.user.user_group_id)
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async setRefs (userGroupId) {
      const data = await callApiUserGetRefList(this, { user_group_id: userGroupId })
      if (data.status === true) {
        this.refs = data.response.refs
        this.ref_name = data.response.user_group_name
      }
    },
    async onSubmit (params) {
      const result = await callApiUserUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Update Success'),
          message: this.$t('user.Update user success')
        })
        this.$router.push(this.localePath('/user'))
      } else {
        this.flashMessage.error({
          title: this.$t('user.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
