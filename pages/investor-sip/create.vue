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
            <h4 class="card-title">{{ $t('user.Create User') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.Distribution') }}</label>
              <div class="col-md-3">
                <b-select name="fund_distributor_id" :options="distributions" @input="onChangeDistribution">
                  <option value="">-- {{ $t('investor_sip.Select Distribution') }} --</option>
                </b-select>
              </div>
            </div>
            <div v-if="refsTrandingAccount !== null" class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.Trading account') }}</label>
              <div class="col-md-3">
                <b-select name="investor_id" :options="refsTrandingAccount" @input="onChangeTradingAccout">
                  <option value="">-- {{ $t('investor_sip.Select Trading Account') }} --</option>
                </b-select>
              </div>
            </div>
            <div v-if="refsDetailAndSipProducts !== null" class="row">
              <label class="col-md-3 col-form-label"></label>
              <div class="col-md-6">
                <div class="wp-div">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="text-14"><span>{{ $t('investor_sip.Investor s name') }}: </span><b>{{ refsDetailAndSipProducts.name }}</b></p>
                      <p class="text-14"><span>{{ $t('investor_sip.ID code') }}: </span><b>{{ refsDetailAndSipProducts.id_number }}</b></p>
                      <p class="text-14"><span>{{ $t('investor_sip.Date of Issue') }}: </span><b>{{ refsDetailAndSipProducts.id_issuing_date }}</b></p>
                      <p class="text-14"><span>{{ $t('investor_sip.Authorization information') }}: </span><b>{{ refsDetailAndSipProducts.au_fullname }}</b></p>
                    </div>
                    <div class="col-md-3">
                      <div class="thumb text-center">
                        <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" />
                      </div>
                      <p class="text-center">ID code</p>
                    </div>
                    <div class="col-md-3">
                      <div class="thumb">
                        <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" />
                      </div>
                      <p class="text-center">Avatar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.Fund code') }}</label>
              <div class="col-md-3">
                <b-select name="fund_certificate_id" :options="fund_certificate_id" @input="onChangeFundCode">
                  <option value="">-- {{ $t('investor_sip.Select Fund Code') }} --</option>
                </b-select>
              </div>
            </div>
            <div v-if="fund_product_id !== null" class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.SIP Product') }}</label>
              <div class="col-md-3">
                <b-select name="fund_product_id" :options="fund_product_id" @input="onChangeSipProduct">
                  <option value="">-- {{ $t('investor_sip.Select Sip Product') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.Payment method') }}</label>
              <div class="col-md-3">
                <b-select name="payment_type" :options="payment_type">
                  <option value="">-- {{ $t('investor_sip.Select Payment Method') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investor_sip.Periodic Amount(VND)') }}</label>
              <div class="col-md-3">
                <b-input
                  name="periodic_amount"
                  type="text"
                />
              </div>
            </div>
            <div v-if="refsSipPacKageInfo !== null" class="row">
              <div class="col-md-10">
                <div class="wp-div">
                  <div class="row">
                    <div class="col-md-12">
                      <h5>{{ $t('investor_sip.SIP PACKAGE INFOMATION') }}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <p class="text-14"><span>{{ $t('investor_sip.Frequency') }}: </span><b>{{ refsSipPacKageInfo.frequency_type }}</b></p>
                    </div>
                    <div class="col-md-6">
                      <p class="text-14"><span>{{ $t('investor_sip.Minimum Period') }}: </span><b>{{ refsSipPacKageInfo.minimum_period }}</b></p>
                    </div>
                    <div class="col-md-6">
                      <p class="text-14"><span>{{ $t('investor_sip.Registration date') }}: </span><b>{{ refsSipPacKageInfo.created_at }}</b></p>
                    </div>
                    <div class="col-md-6">
                      <p class="text-14"><span>{{ $t('investor_sip.Description') }}: </span><b>{{ refsSipPacKageInfo.description }}</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-primary">{{ $t('investor_sip.Add') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, integer } from 'vuelidate/lib/validators'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor.js'
import { callApiGetListTradingAccountNumber, callApiGetDetailAndSipProducts } from '@/apis/investor.js'
import { callApiGetSipType, callApiInvestorSipCreate } from '@/apis/investor_sip.js'
import { callApiFundCertificateGetList } from '@/apis/fund_certificate'
import { callApiFundProductGetList, callApiFundProductDetail } from '@/apis/fund_product'
import BForm from '@/components/UI/form/BForm'
import BSelect from '@/components/UI/form/BSelect'

export default {
  components: {
    BForm,
    BSelect
  },
  data () {
    return {
      distributions: [],
      tradingAccounts: [],
      payment_type: [],
      fund_certificate_id: [],
      fund_product_id: null,
      refsSipProduct: null,
      refsTrandingAccount: null,
      refsDetailAndSipProducts: null,
      refsSipPacKageInfo: null,
      validates: {
        fund_distributor_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investor_sip.validates.Distribution is required')
          }
        },
        investor_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investor_sip.validates.Trading Account is required')
          }
        },
        fund_certificate_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investor_sip.validates.Fund code is required')
          }
        },
        payment_type: {
          rules: { required, integer },
          messages: {
            required: this.$t('investor_sip.validates.Payment method is required')
          }
        },
        periodic_amount: {
          rules: { required },
          messages: {
            required: this.$t('investor_sip.validates.Periodic Amount is required')
          }
        },
        fund_product_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investor_sip.validates.Sip Product is required')
          }
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.myProfile.user
    }
  },
  async created () {
    this.distributions = await callApiFundDistributorGetList(this)
    this.payment_type = await callApiGetSipType(this)
    this.fund_certificate_id = await callApiFundCertificateGetList(this)
  },
  methods: {
    onChangeDistribution (name, value, error) {
      this.handleGetTradingAccountNumber(value)
    },
    async handleGetTradingAccountNumber (distributorId) {
      this.refsTrandingAccount = null
      const data = await callApiGetListTradingAccountNumber(this, { fun_distributor_id: distributorId })
      if (data.status === true) {
        this.refsTrandingAccount = data.response
      } else {
        this.refsDetailAndSipProducts = null
      }
    },
    onChangeTradingAccout (name, value, error) {
      this.handleGetDetailAndSipProduct(value)
    },
    async handleGetDetailAndSipProduct (investorId) {
      this.refsDetailAndSipProducts = null
      const data = await callApiGetDetailAndSipProducts(this, { investor_id: investorId })
      if (data.status === true) {
        this.refsDetailAndSipProducts = data.response
      }
      return data
    },
    onChangeFundCode (name, value, error) {
      this.handleGetSipProduct(value)
    },
    async handleGetSipProduct (fundCertificateId) {
      this.fund_product_id = null
      await callApiFundProductGetList(this, { fund_certificate_id: fundCertificateId }).then((data) => {
        this.fund_product_id = data
      })
    },
    onChangeSipProduct (name, value, error) {
      this.handGetSipPacKageInfo(value)
    },
    async handGetSipPacKageInfo (fundProductId) {
      this.refsSipPacKageInfo = null
      const data = await callApiFundProductDetail(this, { fund_product_id: fundProductId })
      if (data.status === true) {
        this.refsSipPacKageInfo = data.response
        return data
      }
    },
    async onSubmit (params) {
      params.fund_company_id = parseInt(this.refsSipPacKageInfo.fund_company_id)
      params.fund_certificate_id = parseInt(params.fund_certificate_id)
      params.fund_product_type_id = parseInt(this.refsSipPacKageInfo.fund_product_type_id)
      params.fund_product_id = parseInt(params.fund_product_id)
      params.fund_distributor_id = parseInt(params.fund_distributor_id)
      params.investor_id = parseInt(params.investor_id)
      params.payment_type = parseInt(params.payment_type)
      params.status = 1
      params.created_by = parseInt(this.user.id)

      const result = await callApiInvestorSipCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor_sip.Create Success'),
          message: this.$t('investor_sip.Create Sip success')
        })
        this.$router.push(this.localePath('/investor-sip'))
      } else {
        this.flashMessage.error({
          title: this.$t('investor_sip.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
<style scoped>
.thumb {
  width: 70px;
  display: block;
  overflow: hidden;
  margin: 0 auto;
}
.thumb img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 5px;
}
.text-center {
  text-align: center;
}
.wp-div {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 15px;
  background: #dddddd4a;
}
.text-14 {
  font-size: 14px;
}
</style>
