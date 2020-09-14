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
            <h4 class="card-title">{{ $t('fundDistributor.Update fund distributor') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_distributor_id" :value="data.id" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Company') }}</label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :disabled="true" :value="data.fund_company_id" :options="fundCompanies" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" :value="data.name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Code') }}</label>
              <div class="col-md-5">
                <b-input name="code" :value="data.code" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.License number') }}</label>
              <div class="col-md-8">
                <b-input name="license_number" :value="data.license_number" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Issuing date') }}</label>
              <div class="col-md-3">
                <b-input name="issuing_date" :value="data.issuing_date" type="text" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('fundDistributor.Phone') }}</label>
              <div class="col-md-3">
                <b-input name="phone" :value="data.phone" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Head office') }}</label>
              <div class="col-md-8">
                <b-textarea name="head_office" :value="data.head_office" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Website') }}</label>
              <div class="col-md-8">
                <b-input name="website" type="text" :value="data.website" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('fundDistributor.Update fund distributor') }}</button>
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
import { date } from '@/components/UI/form/BValidate'
import { callApiFundDistributorUpdate, callApiFundDistributorDetail } from '@/apis/fund_distributor'
import { callApiFundCompanyGetList } from '@/apis/fund_company'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BTextarea from '@/components/UI/form/BTextarea'
import BSelect from '@/components/UI/form/BSelect'
import BInputHidden from '@/components/UI/form/BInputHidden'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BInput,
    BTextarea,
    BSelect,
    BInputHidden,
    BForm
  },
  data () {
    return {
      fundCompanies: [],
      data: null,
      validates: {
        name: {
          rules: { required, maxLength: maxLength(500) },
          messages: {
            required: this.$t('fundDistributor.validates.Name is required'),
            maxLength: this.$t('fundDistributor.validates.Name maxlength 500')
          }
        },
        code: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('fundDistributor.validates.Code is required'),
            maxLength: this.$t('fundDistributor.validates.Code maxlength 255')
          }
        },
        license_number: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: this.$t('fundDistributor.validates.License Number maxlength 255')
          }
        },
        issuing_date: {
          rules: { date },
          messages: {
            date: this.$t('fundDistributor.validates.Issuing Date invalid')
          }
        },
        head_office: {
          rules: { },
          messages: { }
        },
        phone: {
          rules: {},
          messages: {}
        },
        website: {
          rules: {},
          messages: {}
        }
      }
    }
  },
  async created () {
    const data = await callApiFundDistributorDetail(this, { fund_distributor_id: this.$route.params.id })
    if (data.status === true) {
      this.data = data.response
      this.fundCompanies = await callApiFundCompanyGetList(this)
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributor.Update Success'),
          message: this.$t('fundDistributor.Update Success')
        })
        this.$router.push(this.localePath('/fund-distributor'))
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributor.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
