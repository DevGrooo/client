<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">
                <label class="col-form-label">{{ $t('trading_order_fee_buy.fund product') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-3">
                <b-select name="fund_product_id" type="text" :options="relist_fund_product_id">
                  <option value="">{{ $t('trading_order_fee_buy.Select fund product') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label class="col-form-label">{{ $t('trading_order_fee_buy.setting date') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-3">
                <b-input name="start_at" type="date" />
              </div>
            </div>
            <div class="investment-value">
              <div class=" investment row"><label>{{ $t('trading_order_fee_buy.investment value') }}</label></div>
              <div v-for="(item, index) in lines" :key="index" class="box-multi-input row">
                <div class="row col-md-6">
                  <div class="col-md-6">
                    <label class="col-form-label">{{ $t('trading_order_fee_buy.target') }}</label>
                    <span class="Obligatory">*</span>
                  </div>
                  <div class="col-md-6">
                    <input v-model="item.min_amount" type="text" placeholder="Billon" class="form-control" />
                  </div>
                </div>
                <div class="row col-md-6">
                  <div class="col-md-5">
                    <label class="col-form-label">{{ $t('trading_order_fee_buy.fee percent') }}</label>
                    <span class="Obligatory">*</span>
                  </div>
                  <div class="col-md-7">
                    <input v-model="item.fee_percent" type="text" placeholder="%" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="addNewRow row col-md-12">
                <a class="btn btn-primary float-right" @click="addNewRow"><i class="fa fa-plus-square" aria-hidden="true"></i></a>
              </div>
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
      </b-form>
    </div>
  </div>
</template>
<script>
  import { required } from 'vuelidate/lib/validators'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  import { callApiFundProductGetList } from '@/apis/fund_product'
  import { callApiTradingOrderFeeBuyCreate } from '@/apis/trading_order_fee_buy'
  export default {
    components: {
      BForm,
      BInput,
      BSelect
    },
    data () {
      return {
        relist_fund_product_id: [],
        lines: [
          { min_amount: '', fee_percent: '' }
        ],
        status: [],
        validates: {
          fund_product_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_order_fee_buy.validates fund product is required')
            }
          },
          start_at: {
            rules: { required },
            messages: {
              required: this.$t('trading_order_fee_buy.validates start at is required')
            }
          }
        }
      }
    },
    async created () {
      this.relist_fund_product_id = await callApiFundProductGetList(this)
    },
    methods: {
      addNewRow () {
        this.lines.push({
          min_amount: '',
          fee_percent: ''
        })
      },
      async onsubmit (params) {
        params.lines = this.lines
        const result = await callApiTradingOrderFeeBuyCreate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_order_fee_buy.Create Success'),
            message: this.$t('trading_order_fee_buy.Create trading order fee buy Success')
          })
          this.$router.push(this.localePath('/trading-order-fee-buy'))
        } else {
          this.flashMessage.error({
            title: this.$t('trading_order_fee_buy.Create Error'),
            message: this.$t('trading_order_fee_buy.Create trading order fee buy Error')

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
  .investment-value {
    border:1px solid #E3E3E3;
    height: auto;
    width: fit-content;
    background-color: #f9f9f9;
  }
  .investment-value > .investment {
    margin-left:50px;
    margin-top:20px
  }
  .box-multi-input, .addNewRow {
    margin:35px
  }
  .fa-plus-square {
    color: white;
  }
</style>
