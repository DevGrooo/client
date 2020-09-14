<template>
  <div v-if="data" class="row">
    <div class="col-md-12">
      <b-form
        :validates="validates"
        :data="data"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('cashin.Update Investor') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="cashin_id" />
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Distributor Name') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_distributor_name" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('cashin.Supervising Bank Name') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="supervising_bank_name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Certificate Name') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_certificate_name" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('cashin.Account Holder') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_distributor_bank_account_account_holder" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Product Name') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_product_name" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('cashin.Account Number') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_distributor_bank_account_account_number" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Amount') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="amount" :value="new Intl.NumberFormat('de-DE', { style: 'currency', currency: data.currency }).format(data.amount)" />
              </div>
              <label class="col-md-2 col-form-label">{{ $t('cashin.Branch') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="fund_distributor_bank_account_branch" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Paid Time') }}</label>
              <div class="col-md-4">
                <b-input :disabled="true" name="bank_paid_at" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Transaction Detail') }}</label>
              <div class="col-md-10">
                <div class="alert alert-info"><p>{{ data.bank_trans_note }}</p></div>
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('cashin.Investor Name') }}</label>
              <div class="col-md-4">
                <b-select name="investor_id" :options="investors" @input="onChangeInvestor">
                  <option value="">{{ $t('cashin.Select Investor') }}</option>
                </b-select>
              </div>
              <template v-if="investorSelected">
                <label class="col-md-2 col-form-label">{{ $t('cashin.Trading Account Number') }}</label>
                <div class="col-md-4">
                  <b-input :disabled="true" name="trading_account_number" :value="investorSelected.trading_account_number" />
                </div>
              </template>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-4">
                <button type="submit" class="btn btn-primary">{{ $t('cashin.Update Investor') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { callApiCashinDetail, callApiCashinUpdateInvestor } from '@/apis/cashin'
import { callApiInvestorGetList, callApiInvestorDetail } from '@/apis/investor'
import BForm from '@/components/UI/form/BForm'
import BSelect from '@/components/UI/form/BSelect'
import BInputHidden from '@/components/UI/form/BInputHidden'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BSelect,
    BInputHidden,
    BForm
  },
  data () {
    return {
      investors: [],
      investorSelected: null,
      data: null,
      validates: {
        investor_id: {
          rules: { required },
          messages: {
            required: this.$t('cashin.validates.Investor is required')
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiCashinDetail(this, { cashin_id: this.$route.params.id })
    if (data.status === true) {
      this.data = data.response
      this.investors = await callApiInvestorGetList(this, { fund_distributor_id: this.data.fund_distributor_id })
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onChangeInvestor (name, value) {
      if (parseInt(value) > 0) {
        const result = await callApiInvestorDetail(this, { investor_id: value })
        if (result.status === true) {
          this.investorSelected = result.response
        }
      } else {
        this.investorSelected = null
      }
    },
    async onSubmit (params) {
      const result = await callApiCashinUpdateInvestor(this, { cashin_id: params.cashin_id, investor_id: params.investor_id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Update Success'),
          message: this.$t('common.Update Success')
        })
        this.$router.push(this.localePath('/cashin'))
      } else {
        this.flashMessage.error({
          title: this.$t('common.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
