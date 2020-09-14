<template>
  <div class="row">
    <div class="col-md-12">
      <b-form
        name="formCreate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('user.Create User') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.User Group') }}</label>
              <div class="col-md-8">
                <b-select name="user_group_id" :options="user_groups" @input="onChangeUserGroup">
                  <option value="">{{ $t('user.Select User Group') }}</option>
                </b-select>
              </div>
            </div>
            <div v-if="refs !== null" class="row">
              <label class="col-md-3 col-form-label">{{ ref_name }}</label>
              <div class="col-md-8">
                <b-select name="ref_id" :options="refs">
                  <option value="">{{ $t('user.Select Ref ID') }}</option>
                </b-select>
              </div>
            </div>
            <b-input-hidden v-else name="ref_id" type="hidden" value="0" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Username') }}</label>
              <div class="col-md-8">
                <b-input
                  name="username"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Fullname') }}</label>
              <div class="col-md-8">
                <b-input
                  name="fullname"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Email') }}</label>
              <div class="col-md-8">
                <b-input
                  name="email"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Mobile') }}</label>
              <div class="col-md-3">
                <b-input
                  name="mobile"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('user.Status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('user.Select Status') }}</option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('user.Add') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, maxLength, email, integer, helpers } from 'vuelidate/lib/validators'
import { username, mobile } from '@/components/UI/form/BValidate'
import { callApiUserCreate, callApiUserGetStatus, callApiUserGetRefList, callApiUserGetUserGroupList } from '@/apis/user'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BInputHidden from '@/components/UI/form/BInputHidden'
import BSelect from '@/components/UI/form/BSelect'

function isUserRefId (value, parentVm) {
  if (!helpers.req(value)) {
      return true
  }
  if (parentVm.user_group_id <= 1) {
    return true
  } else if (value > 0) {
    return true
  }
  return false
}

export default {
  components: {
    BForm,
    BInput,
    BInputHidden,
    BSelect
  },
  data () {
    return {
      user_groups: [],
      status: [],
      refs: null,
      ref_name: '',
      validates: {
        user_group_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('user.validates.User Group is required'),
            integer: this.$t('user.validates.User Group invalid')
          }
        },
        ref_id: {
          rules: { required, isUserRefId },
          messages: {
            required: this.$t('user.validates.Ref ID is required'),
            isUserRefId: this.$t('user.validates.Ref ID invalid')
          }
        },
        username: {
          rules: { required, username },
          messages: {
            required: this.$t('user.validates.Username is required'),
            username: this.$t('user.validates.Username invalid')
          }
        },
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
        },
        status: {
          rules: { required, integer },
          messages: {
            required: this.$t('user.validates.Status is required'),
            integer: this.$t('user.validates.Status invalid')
          }
        }
      }
    }
  },
  async created () {
    this.user_groups = await callApiUserGetUserGroupList(this)
    this.status = await callApiUserGetStatus(this)
  },
  methods: {
    onChangeUserGroup (name, value, error) {
      this.setRefs(value)
    },
    async setRefs (userGroupId) {
      this.refs = null
      const data = await callApiUserGetRefList(this, { user_group_id: userGroupId })
      if (data.status === true) {
        this.refs = data.response.refs
        this.ref_name = data.response.user_group_name
      }
    },
    async onSubmit (params) {
      const result = await callApiUserCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Create Success'),
          message: this.$t('user.Create user success')
        })
        this.$router.push(this.localePath('/user'))
      } else {
        this.flashMessage.error({
          title: this.$t('user.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
