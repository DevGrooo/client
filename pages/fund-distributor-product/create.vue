<template>
  <div class="row">
    <div class="col-md-12">
      <b-form
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fundDistributorProduct.Add') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-select name="fund_distributor_id" :options="fundDistributors" @input="changeDistributor">
                  <option value="">{{ $t('fundDistributorProduct.Select Fund Distributor') }}</option>
                </b-select>
              </div>
            </div>
            <div v-if="showForm">
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Fund Product') }}</label>
                <div class="col-md-8">
                  <b-select name="fund_product_id" :options="fundProducts">
                    <option value="">{{ $t('fundDistributorProduct.Select Fund Product') }}</option>
                  </b-select>
                </div>
              </div>
              <div></div>
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Supervising Bank') }}</label>
                <div class="col-md-8">
                  <b-select name="supervising_bank_id" :options="supervisingBanks">
                    <option value="">{{ $t('fundDistributorProduct.Select Supervising Bank') }}</option>
                  </b-select>
                </div>
              </div>
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Account Holder') }}</label>
                <div class="col-md-8">
                  <b-input name="account_holder" type="text" class-css="form-control text-uppercase" />
                </div>
              </div>
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Account Number') }}</label>
                <div class="col-md-8">
                  <b-input name="account_number" type="text" />
                </div>
              </div>
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Branch') }}</label>
                <div class="col-md-8">
                  <b-input name="branch" type="text" />
                </div>
              </div>
              <div class="row">
                <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Status') }}</label>
                <div class="col-md-3">
                  <b-select name="status" :options="status">
                    <option value="">{{ $t('fundDistributorProduct.Select status') }}</option>
                  </b-select>
                </div>
              </div>
            </div>
            <div v-if="showWarning" class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <notify type="warning">{{ $t('fundDistributorProduct.Not Product For Add') }}</notify>
              </div>
            </div>
            <div v-if="showForm" class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-primary">{{ $t('fundDistributorProduct.Add') }}</button>
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
import { required, maxLength, integer } from 'vuelidate/lib/validators'
import { accountHolder, accountNumber } from '@/components/UI/form/BValidate'
import { callApiFundDistributorProductCreate, callApiFundDistributorProductGetStatus } from '@/apis/fund_distributor_product'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
import { callApiFundProductGetList } from '@/apis/fund_product'
import { callApiSupervisingBankGetList } from '@/apis/supervising_bank'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'
import Notify from '@/components/UI/notify/Notify'

export default {
  components: {
    BInput,
    BSelect,
    BForm,
    Notify
  },
  data () {
    return {
      fundDistributors: [],
      fundProducts: [],
      supervisingBanks: [],
      status: [],
      showForm: false,
      showWarning: false,
      validates: {
        fund_distributor_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Distributor is required'),
            integer: this.$t('fundDistributorProduct.validates.Distributor invalid')
          }
        },
        fund_product_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Product is required'),
            integer: this.$t('fundDistributorProduct.validates.Product invalid')
          }
        },
        supervising_bank_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Supervising Bank is required'),
            integer: this.$t('fundDistributorProduct.validates.Supervising Bank invalid')
          }
        },
        account_holder: {
          rules: { required, accountHolder },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Account Holder is required'),
            accountHolder: this.$t('fundDistributorProduct.validates.Account Holder invalid')
          }
        },
        account_number: {
          rules: { required, accountNumber },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Account Number is required'),
            accountNumber: this.$t('fundDistributorProduct.validates.Account Number invalid')
          }
        },
        branch: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Branch is required'),
            maxLength: this.$t('fundDistributorProduct.validates.Branch maxlength 255')
          }
        },
        status: {
          rules: { required, integer },
          messages: {
            required: this.$t('fundDistributorProduct.validates.Status is required'),
            integer: this.$t('fundDistributorProduct.validates.Status invalid')
          }
        }
      }
    }
  },
  async created () {
    this.fundDistributors = await callApiFundDistributorGetList(this)
  },
  methods: {
    async changeDistributor (name, value, error) {
      if (parseInt(value) > 0) {
        this.fundProducts = await callApiFundProductGetList(this, { fund_distributor_id: value })
        if (this.fundProducts.length > 0) {
          this.showForm = true
          this.supervisingBanks = await callApiSupervisingBankGetList(this)
          this.status = await callApiFundDistributorProductGetStatus(this)
        } else {
          this.showWarning = true
        }
      } else {
        this.showForm = false
        this.showWarning = false
      }
    },
    async onSubmit (params) {
      const result = await callApiFundDistributorProductCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributor.Create Success'),
          message: this.$t('fundDistributor.Create Success')
        })
        this.$router.push(this.localePath('/fund-distributor-product'))
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
