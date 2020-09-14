<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('trading_order.distributor') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-select name="fund_distributor_id" type="text" :options="fundDistributors" @input="changeDistributor">
                  <option value="">{{ $t('trading_order.select distributor') }}</option>
                </b-select>
              </div>
            </div>
            <div v-if="showTradingAcount">
              <div class="row">
                <div class="col-md-3">
                  <label class="col-form-label">{{ $t('trading_order.trading account') }}</label>
                  <span class="Obligatory">*</span>
                </div>
                <div class="col-md-8">
                  <b-select name="investor_id" :options="investors" @input="changeInvestor">
                    <option value="">{{ $t('trading_order.select investor code') }}</option>
                  </b-select>
                </div>
              </div>
              <div v-if="showDetail" class="detail">
                <div class="detail-child row">
                  <div class="col-md-8">
                    <div class="col-md-8">
                      <div class="row">
                        <span class="left" for="">{{ $t('trading_order.Full name') }}: </span>
                        <span class="right">{{ detail.name }}</span>
                      </div>
                      <div class="row">
                        <span class="left" for="">{{ $t('trading_order.ID code') }}:</span>
                        <span class="right">{{ detail.id_number }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="showOrderType">
                <div class="row">
                  <div class="col-md-3">
                    <label class="col-form-label">{{ $t('trading_order.Order Type') }}</label>
                    <span class="Obligatory">*</span>
                  </div>
                  <div class="col-md-8">
                    <b-select name="deal_type" :options="orderTypes" @input="changeOrderType">
                      <option value="">{{ $t('trading_order.select order type') }}</option>
                    </b-select>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showForm">
              <div>
                <div class="row">
                  <div class="col-md-3">
                    <label class="col-form-label">{{ $t('trading_order.Fund') }}</label>
                    <span class="Obligatory">*</span>
                  </div>
                  <div class="col-md-8">
                    <b-select name="fund_certificate_id" :options="funds" @input="changeFunds">
                      <option value="">{{ $t('trading_order.select fund') }}</option>
                    </b-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <label class="col-form-label">{{ $t('trading_order.Product Code') }}</label>
                    <span class="Obligatory">*</span>
                  </div>
                  <div class="col-md-8">
                    <b-select name="fund_product_id" :options="productCodes">
                      <option value="">{{ $t('trading_order.select Product Code') }}</option>
                    </b-select>
                  </div>
                </div>

                <div v-if="showSubAmount">
                  <div class="row">
                    <div class="col-md-3">
                      <label class="col-form-label">Sub amount</label>
                      <span class="Obligatory">*</span>
                    </div>
                    <div class="col-md-8">
                      <b-input type="text" name="sub_amount" />
                    </div>
                  </div>
                </div>
                <div v-if="showOrderQuantity">
                  <div class="row">
                    <div class="col-md-3">
                      <label class="col-form-label">Order Quantity</label>
                      <span class="Obligatory">*</span>
                    </div>
                    <div class="col-md-8">
                      <b-input type="text" name="sub_amount" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-info">{{ $t('auth.save') }}</button>
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
  import { required } from 'vuelidate/lib/validators'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
  import { callApiInvestorGetListTradingAccountNumber, callApiInvestorDetail } from '@/apis/investor'
  import { callApiFundCertificateGetFundProduct, callApiFundCertificateGetListByFundDistributorProduct } from '@/apis/fund_certificate'
  import { callApiTradingOrderCreate } from '@/apis/trading_order'

  export default {
    components: {
      BInput,
      BSelect,
      BForm
    },
    data () {
      return {
        fundDistributors: [],
        investors: [],
        detail: {},
        orderTypes: [
          { title: 'NS', value: 'NS' },
          { title: 'NR', value: 'NR' }
        ],
        funds: [],
        productCodes: [],
        showForm: false,
        showTradingAcount: false,
        showDetail: false,
        showSubAmount: false,
        showOrderType: false,
        showOrderQuantity: false,
        validates: {
          fund_distributor_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_order.validates fund_distributor is required')
            }
          },
          investor_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_order.validates investor_id is required')
            }
          },
          deal_type: {
            rules: { required },
            messages: {
              required: this.$t('trading_order.validates deal_type is required')
            }
          },
          fund_certificate_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_order.validates fund_certificate_id is required')
            }
          },
          fund_product_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_order.validates fund_product_id is required')
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
        console.log('ádsadsa')
        if (parseInt(value) > 0) {
          this.investors = await callApiInvestorGetListTradingAccountNumber(this, { fund_distributor_id: value })
          console.log(this.investors)
          this.funds = await callApiFundCertificateGetListByFundDistributorProduct(this, { fund_distributor_id: value })
          if (this.investors.length > 0) {
            this.showTradingAcount = true
          }
        } else {
          this.showTradingAcount = false
          this.showForm = false
        }
      },
      async changeInvestor (name, value, error) {
        if (parseInt(value) > 0) {
          if (this.investors.length > 0) {
            this.showDetail = true
            const data = await callApiInvestorDetail(this, { investor_id: value })
            this.detail = data.response
            this.showOrderType = true
          }
        } else {
          this.showDetail = false
          this.showOrderType = false
        }
      },
      changeOrderType (name, value, error) {
        if (value === 'NS') {
          this.showForm = true
          this.showSubAmount = true
          this.showOrderQuantity = false
        } else if (value === 'NR') {
          this.showForm = true
          this.showSubAmount = false
          this.showOrderQuantity = true
        } else {
          this.showForm = false
          this.showSubAmount = false
          this.showOrderQuantity = false
        }
      },
      async changeFunds (name, value, error) {
        if (parseInt(value) > 0) {
          this.productCodes = await callApiFundCertificateGetFundProduct(this, { fund_certificate_id: value })
        }
      },
      async onsubmit (params) {
        const result = await callApiTradingOrderCreate(this, params)
        console.log(result)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_order.Create Success'),
            message: this.$t('trading_order.Create trading order Success')
          })
          this.$router.push(this.localePath('/trading-order'))
        } else {
          this.flashMessage.error({
            title: this.$t('trading_order.Create Error'),
            message: this.$t('trading_order.Create trading order Error')

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
  .detail {
    margin-bottom: 20px;
  }
  .detail-child {
    width: 500px;
    margin-left: 30%;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #f9f9f9;
    line-height: 30px;
    border: 1px solid #E3E3E3;
    font-size: 14px;
  }
  .right {
    padding-left: 5px;
    font-weight: bold;
  }
</style>
