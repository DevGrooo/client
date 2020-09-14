<template>
  <div class="row">
    <div class="col-md-12">
      <b-form
        name="formCreateInvestor"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fundDistributor.Create Fund Distributor') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Company') }}</label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :options="fund_companies">
                  <option value="">{{ $t('fundDistributor.Select company') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Code') }}</label>
              <div class="col-md-5">
                <b-input name="code" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.License number') }}</label>
              <div class="col-md-8">
                <b-input name="license_number" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Issuing date') }}</label>
              <div class="col-md-3">
                <b-input name="issuing_date" type="date" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('fundDistributor.Phone') }}</label>
              <div class="col-md-3">
                <b-input name="phone" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Head office') }}</label>
              <div class="col-md-8">
                <b-textarea name="head_office" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Website') }}</label>
              <div class="col-md-8">
                <b-input name="website" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributor.Status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('fundDistributor.Select status') }}</option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('fundDistributor.Create Fund Distributor') }}</button>
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
import { date } from '@/components/UI/form/BValidate'
import { callApiFundDistributorCreate, callApiFundDistributorGetStatus } from '@/apis/fund_distributor'
import { callApiFundCompanyGetList } from '@/apis/fund_company'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BTextarea from '@/components/UI/form/BTextarea'
import BSelect from '@/components/UI/form/BSelect'

export default {
  components: {
    BInput,
    BTextarea,
    BSelect,
    BForm
  },
  data () {
    return {
      fund_companies: [],
      status: [],
      validates: {
        fund_company_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributor.validates.Company is required'),
            integer: this.$t('fundDistributor.validates.Company invalid')
          }
        },
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
        },
        status: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributor.validates.Status is required'),
            integer: this.$t('fundDistributor.validates.Status invalid')
          }
        }
      }
    }
  },
  async created () {
    this.fund_companies = await callApiFundCompanyGetList(this)
    this.status = await callApiFundDistributorGetStatus(this)
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributor.Create Success'),
          message: this.$t('fundDistributor.Create Success')
        })
        this.$router.push(this.localePath('/fund-distributor'))
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributor.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
