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
            <h4 class="card-title">{{ $t('fundDistributorProduct.Update Fund Distributor Product') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_distributor_product_id" :value="data.id" />
            <b-input-hidden name="fund_distributor_bank_account_id" :value="data.fund_distributor_bank_account_id" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-input name="fund_distributor_id" type="text" :disabled="true" :value="data.fund_distributor.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Fund Product') }}</label>
              <div class="col-md-8">
                <b-input name="fund_product_id" type="text" :disabled="true" :value="data.fund_product.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Supervising Bank') }}</label>
              <div class="col-md-8">
                <b-select name="supervising_bank_id" :options="supervisingBanks" :value="data.fund_distributor_bank_account.supervising_bank_id">
                  <option value="">{{ $t('fundDistributorProduct.Select Supervising Bank') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Account Holder') }}</label>
              <div class="col-md-8">
                <b-input name="account_holder" type="text" class-css="form-control text-uppercase" :value="data.fund_distributor_bank_account.account_holder" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Account Number') }}</label>
              <div class="col-md-8">
                <b-input name="account_number" type="text" :value="data.fund_distributor_bank_account.branch" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorProduct.Branch') }}</label>
              <div class="col-md-8">
                <b-input name="branch" type="text" :value="data.fund_distributor_bank_account.branch" />
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-primary">{{ $t('fundDistributorProduct.Update Fund Distributor Product') }}</button>
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
import { callApiFundDistributorProductUpdate, callApiFundDistributorProductDetail } from '@/apis/fund_distributor_product'
import { callApiSupervisingBankGetList } from '@/apis/supervising_bank'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BInputHidden from '@/components/UI/form/BInputHidden'
import BSelect from '@/components/UI/form/BSelect'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BInput,
    BInputHidden,
    BSelect,
    BForm
  },
  data () {
    return {
      supervisingBanks: [],
      data: null,
      validates: {
        bank_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investorBankAccount.validates.Bank is required'),
            integer: this.$t('investorBankAccount.validates.Bank invalid')
          }
        },
        account_holder: {
          rules: { required, accountHolder },
          messages: {
            required: this.$t('investorBankAccount.validates.Account Holder is required'),
            accountHolder: this.$t('investorBankAccount.validates.Account Holder invalid')
          }
        },
        account_number: {
          rules: { required, accountNumber },
          messages: {
            required: this.$t('investorBankAccount.validates.Account Number is required'),
            accountNumber: this.$t('investorBankAccount.validates.Account Number invalid')
          }
        },
        branch: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('investorBankAccount.validates.Branch is required'),
            maxLength: this.$t('investorBankAccount.validates.Branch maxlength 255')
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiFundDistributorProductDetail(this, { fund_distributor_product_id: this.$route.params.id })
    if (data.status === true) {
      this.data = data.response
      this.supervisingBanks = await callApiSupervisingBankGetList(this)
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorProductUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorProduct.Update Success'),
          message: this.$t('fundDistributorProduct.Update Success')
        })
        this.$router.push(this.localePath('/fund-distributor-product'))
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorProduct.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
