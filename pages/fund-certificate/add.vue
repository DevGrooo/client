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
              <label class="col-md-3 col-form-label">
                {{ $t('fund_certificate.fund company') }}
                <span class="text-danger">(*):</span>
              </label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :options="fund_companys">
                  <option value="">-- {{ $t('fund_certificate.choose a fund company') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">
                {{ $t('fund_certificate.name') }}
                <span class="text-danger">(*):</span>
              </label>
              <div class="col-md-8">
                <b-input
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">
                {{ $t('fund_certificate.code') }}
                <span class="text-danger">(*):</span>
              </label>
              <div class="col-md-8">
                <b-input
                  name="code"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">
                {{ $t('fund_certificate.description') }}
              </label>
              <div class="col-md-8">
                <b-textarea
                  name="description"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">
                {{ $t('fund_certificate.status') }}
                <span class="text-danger">(*):</span>
              </label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">-- {{ $t('fund_certificate.choose a status') }} --</option>
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
    <FlashMessage></FlashMessage>
  </div>
</template>
<script>
import { required, maxLength, integer } from 'vuelidate/lib/validators'
import { username } from '@/components/UI/form/BValidate'
import { callApiFundCertificateGetFundCompanyList, callApiFundCertificateCreate } from '@/apis/fund_certificate'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'
import BTextarea from '@/components/UI/form/BTextarea'

export default {
  components: {
    BForm,
    BInput,
    BSelect,
    BTextarea
  },
  data () {
    return {
      fund_companys: [],
      status: [
        { title: this.$t('common.Status.Active'), value: 1 },
        { title: this.$t('common.Status.Lock'), value: 2 }
      ],
      validates: {
        fund_company_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('fund_certificate.fund company is required'),
            integer: this.$t('fund_certificate.fund company is invalid')
          }
        },
        name: {
          rules: { required, username },
          messages: {
            required: this.$t('fund_certificate.name is required'),
            username: this.$t('fund_certificate.name is invalid')
          }
        },
        code: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('fund_certificate.code is required'),
            maxLength: this.$t('fund_certificate.code enter up to 255 characters')
          }
        },
        description: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: this.$t('fund_certificate.description enter up to 255 characters')
          }
        },
        status: {
          rules: { required, integer },
          messages: {
            required: this.$t('fund_certificate.status is required'),
            integer: this.$t('fund_certificate.status is invalid')
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
