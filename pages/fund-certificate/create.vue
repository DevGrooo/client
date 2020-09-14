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
            <h4 class="card-title">{{ $t('fund_certificate.add fund certificate') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.fund company') }}</label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :options="fund_companys">
                  <option value="">-- Chọn công ty quỹ --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.name') }}</label>
              <div class="col-md-8">
                <b-input
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.code') }}</label>
              <div class="col-md-8">
                <b-input
                  name="code"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.description') }}</label>
              <div class="col-md-8">
                <b-input
                  name="description"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">-- Chọn trạng thái --</option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('fund_certificate.add new') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, maxLength, integer } from 'vuelidate/lib/validators'
import { username } from '@/components/UI/form/BValidate'
import { callApiFundCertificateGetFundCompanyList, callApiFundCertificateCreate } from '@/apis/fund_certificate'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'

export default {
  components: {
    BForm,
    BInput,
    BSelect
  },
  data () {
    return {
      fund_companys: [],
      status: [
        { title: 'Đang hoạt động', value: 1 },
        { title: 'Đang khóa', value: 2 }
      ],
      validates: {
        fund_company_id: {
          rules: { required, integer },
          messages: {
            required: 'Công ty quỹ yêu cầu phải chọn',
            integer: 'Công ty quỹ không hợp lệ'
          }
        },
        name: {
          rules: { required, username },
          messages: {
            required: 'Tên chứng chỉ quỹ yêu cầu phải nhập',
            username: 'Tên chứng chỉ quỹ không đúng yêu cầu'
          }
        },
        code: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: 'Mã chứng chỉ quỹ yêu cầu phải nhập',
            maxLength: 'Nhập tối đa 255 ký tự'
          }
        },
        description: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Nhập tối đa 255 ký tự'
          }
        },
        status: {
          rules: { required, integer },
          messages: {
            required: 'Trạng thái yêu cầu phải nhập',
            integer: 'Trạng thái không hợp lệ'
          }
        }
      }
    }
  },
  async created () {
    this.fund_companys = await callApiFundCertificateGetFundCompanyList(this)
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundCertificateCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fund_certificate.create success'),
          message: this.$t('fund_certificate.create fund certificate success')
        })
        this.$router.push('/fund-certificate')
      } else {
        this.flashMessage.error({
          title: this.$t('fund_certificate.create error'),
          message: result.message
        })
      }
    }
  }
}
</script>
