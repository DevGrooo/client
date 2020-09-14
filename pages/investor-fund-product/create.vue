<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" enctype="multipart/form-data" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('investor_fund_product.investor') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-3">
                <b-select name="investor_id" :options="investors" @input="onChangeInvestor">
                  <option value="">{{ $t('investor_fund_product.select investor') }}</option>
                </b-select>
              </div>
            </div>
            <div v-if="showForm" class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('investor_fund_product.fund product') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-3">
                <b-select name="fund_product_id" :options="fund_products">
                  <option value="">{{ $t('investor_fund_product.select fund product') }}</option>
                </b-select>
              </div>
            </div>
            <div v-if="showWarning" class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <notify type="warning">{{ $t('investor_fund_product.Not Product For Add') }}</notify>
              </div>
            </div>
          </div>
          <div v-if="showForm" class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('auth.save') }}</button>
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
  import BForm from '@/components/UI/form/BForm'
import BSelect from '@/components/UI/form/BSelect'
  import { callApiInvestorGetList } from '@/apis/investor'
  import {
    callApiInvestorFundProductCreate,
    callApiInvestorFundProductgetFundProduct
  } from '@/apis/investor_fund_product'

export default {
  components: {
    BForm,
    BSelect
  },
  data () {
    return {
      investors: [],
      fund_product: null,
      showForm: false,
      showWarning: false,
      fund_products: [],
      validates: {
        investor_id: {
          rules: { required },
          messages: {
            required: this.$t('investor_fund_product.Validates investor required')
          }
        },
        fund_product_id: {
          rules: { required },
          messages: {
            required: this.$t('investor_fund_product.Validates fund product required')
          }
        }
      }
    }
  },
  async created () {
    this.investors = await callApiInvestorGetList(this)
  },
  methods: {
    onChangeInvestor (name, value, error) {
      this.setfundProducts(value)
    },
    async setfundProducts (investorId) {
      this.fund_product = null
      const data = await callApiInvestorFundProductgetFundProduct(this, { investor_id: investorId })
        this.fund_products = data
        if (this.fund_products.length > 0) {
          this.showForm = true
        } else {
          this.showWarning = true
        }
    },
    async onsubmit (params) {
      const result = await callApiInvestorFundProductCreate(this, params)
      console.log(result)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor_fund_product.Create Success'),
          message: this.$t('investor_fund_product.Create investor fund product Success')
        })
        this.$router.push(this.localePath('/investor-fund-product'))
      } else {
        this.flashMessage.error({
          title: this.$t('investor_fund_product.Create Error'),
          message: this.$t('investor_fund_product.Create investor fund product Error')
        })
      }
    }
  }
}
</script>
<style>
  .Obligatory {
    color: #ff0000;
    font-size: 20px;
  }
</style>
