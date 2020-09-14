<template>
  <div v-if="data" class="row">
    <div class="col-md-12">
      <b-form
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fundDistributorStaff.Update Fund Distributor Staff') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_distributor_staff_id" :value="data.id" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-input name="fund_distributor_name" type="text" :value="data.fund_distributor.name" :disabled="true" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Staff Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="data.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Certificate Number') }}</label>
              <div class="col-md-3">
                <b-input name="certificate_number" type="text" :value="data.certificate_number" />
              </div>
              <label class="col-md-2 col-form-label text-right">{{ $t('fundDistributorStaff.Issuing Date') }}</label>
              <div class="col-md-3">
                <b-input name="issuing_date" type="date" :value="data.issuing_date" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Email') }}</label>
              <div class="col-md-8">
                <b-input name="email" type="text" :value="data.email" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Phone') }}</label>
              <div class="col-md-4">
                <b-input name="phone" type="text" :value="data.phone" />
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-primary">{{ $t('fundDistributorStaff.Update Fund Distributor Staff') }}</button>
                </div>
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
import { date, idNumber } from '@/components/UI/form/BValidate'
import { callApiFundDistributorStaffUpdate, callApiFundDistributorStaffDetail } from '@/apis/fund_distributor_staff'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BInputHidden from '@/components/UI/form/BInputHidden'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BInput,
    BInputHidden,
    BForm
  },
  data () {
    return {
      data: null,
      validates: {
        name: {
          rules: { required },
          messages: {
            required: 'Họ tên nhân viên yêu cầu phải nhập'
          }
        },
        certificate_number: {
          rules: { required, idNumber },
          messages: {
            required: 'Số CMND yêu cầu phải nhập',
            idNumber: 'Số CMND không hợp lệ'
          }
        },
        issuing_date: {
          rules: { required, date },
          messages: {
            required: 'Ngày cấp yêu cầu phải nhập',
            date: 'Ngày cấp không hợp lệ'
          }
        },
        email: {
          rules: { email },
          messages: {
            email: 'Email không hợp lệ'
          }
        },
        phone: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Số điện thoại không được nhập quá 255 ký tự'
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiFundDistributorStaffDetail(this, { fund_distributor_staff_id: this.$route.params.id })
    if (data.status === true) {
      this.data = data.response
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorStaffUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorStaff.Update Success'),
          message: this.$t('fundDistributorStaff.Update Success')
        })
        this.$router.push(this.localePath('/fund-distributor-staff'))
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorStaff.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
