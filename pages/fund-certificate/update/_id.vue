<template>
  <div v-if="fundCertificate !== null" class="row">
    <div class="col-md-12">
      <b-form
        name="formUpdate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fund_certificate.update') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_certificate_id" :value="fundCertificate.id.toString()" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.fund company') }}</label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :value="fundCertificate.fund_company_id" :options="fund_companys" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="fundCertificate.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.code') }}</label>
              <div class="col-md-8">
                <b-input name="code" type="text" :value="fundCertificate.code" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.description') }}</label>
              <div class="col-md-8">
                <b-input name="description" type="text" :value="fundCertificate.description" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_certificate.status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :value="fundCertificate.status" :options="status" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('fund_certificate.update') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { callApiFundCertificateUpdate, callApiFundCertificateGetFundCompanyList, callApiFundCertificateDetail } from '@/apis/fund_certificate'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BForm,
    BInput,
    BSelect
  },
  data () {
    return {
      fundCertificate: null,
      fund_companys: [],
      status: [],
      validates: {
        name: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: 'Tên chứng chỉ yêu cầu phải nhập',
            maxLength: 'Nhập tối đa 255 ký tự'
          }
        },
        code: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: 'Mã chứng chỉ yêu cầu phải nhập',
            maxLength: 'Nhập tối đa 255 ký tự'
          }
        },
        description: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Nhập tối đa 255 ký tự'
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiFundCertificateDetail(this, { fund_certificate_id: this.$route.params.id })
    if (data.status === true) {
      this.fundCertificate = data.response
      this.fund_companys = await callApiFundCertificateGetFundCompanyList(this)
      this.status = [
        { title: 'Đang hoạt động', value: 1 },
        { title: 'Đang khóa', value: 2 }
      ]
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundCertificateUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fund_certificate.update success'),
          message: this.$t('fund_certificate.update fund certificate success')
        })
        this.$router.push('/fund-certificate')
      } else {
        this.flashMessage.error({
          title: this.$t('fund_certificate.update error'),
          message: result.message
        })
      }
    }
  }
}
</script>
