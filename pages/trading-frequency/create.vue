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
            <h4 class="card-title">{{ $t('trading_frequency.add') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.fund_company_name') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-select name="fund_company_id" type="text" :options="list_fund_company_id">
                  <option value="">-- {{ $t('fund_product.select_fund_company') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.type') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-select name="type" type="text" :options="type" @input="onChangeType">
                  <option value="">-- {{ $t('trading_frequency.type') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.name') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-input
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div v-if="showWday" class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.wday') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-group-radio name="wday" :options="wday" />
              </div>
            </div>
            <div v-if="showMday" class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.mday') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input
                  name="mday"
                  type="number"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.cut_off_date') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input
                  name="cut_off_date"
                  type="number"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.cut_off_hour') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-input
                  name="cut_off_hour"
                  type="time"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.status') }} <span class="star">*</span></label>
              <div class="col-md-3">
                <b-select name="status" type="text" :options="status">
                  <option value="">-- {{ $t('trading_frequency.status') }} --</option>
                </b-select>
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
  import { required, integer, maxValue, minValue } from 'vuelidate/lib/validators'
  import { callApiFundCompanyGetList } from '@/apis/fund_company'
  import { callApiTradingFrequencyCreate, callApiTradingFrequencyGetStatus } from '@/apis/trading-frequency'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  import BGroupRadio from '@/components/UI/form/BGroupRadio'
  export default {
    components: {
      BForm,
      BInput,
      BSelect,
      BGroupRadio
    },
    data () {
      return {
        list_fund_company_id: [],
        status: [],
        wday: [
          { title: this.$t('trading_frequency.wday0'), value: 0 },
          { title: this.$t('trading_frequency.wday2'), value: 1 },
          { title: this.$t('trading_frequency.wday3'), value: 2 },
          { title: this.$t('trading_frequency.wday4'), value: 3 },
          { title: this.$t('trading_frequency.wday5'), value: 4 },
          { title: this.$t('trading_frequency.wday6'), value: 5 },
          { title: this.$t('trading_frequency.wday7'), value: 6 }
        ],
        type: [
          { title: this.$t('trading_frequency.wday'), value: 1 },
          { title: this.$t('trading_frequency.mday'), value: 2 }
        ],
        showWday: false,
        showMday: false,
        validates: {
          fund_company_id: {
            rules: { required },
            messages: {
              required: this.$t('trading_frequency.Validates.fund_company')
            }
          },
          type: {
            rules: { required },
            messages: {
              required: this.$t('trading_frequency.Validates.type')
            }
          },
          name: {
            rules: { required },
            messages: {
              required: this.$t('trading_frequency.Validates.name')
            }
          },
          wday: {
            rules: { integer, maxValue: maxValue(6), minValue: minValue(0) },
            messages: {
              integer: this.$t('trading_frequency.Validates.wday_integer'),
              maxValue: this.$t('trading_frequency.Validates.max-value_w'),
              minValue: this.$t('trading_frequency.Validates.min-value_w')
            }
          },
          mday: {
            rules: { integer, maxValue: maxValue(31), minValue: minValue(1) },
            messages: {
              integer: this.$t('trading_frequency.Validates.mday_integer'),
              maxValue: this.$t('trading_frequency.Validates.max-value_m'),
              minValue: this.$t('trading_frequency.Validates.min-value_m')
            }
          },
          cut_off_date: {
            rules: { required, maxValue: maxValue(31), minValue: minValue(1), integer },
            messages: {
              required: this.$t('trading_frequency.Validates.cut_off_date'),
              integer: this.$t('trading_frequency.Validates.cut_off_date_integer'),
              maxValue: this.$t('trading_frequency.Validates.max-value_cd'),
              minValue: this.$t('trading_frequency.Validates.min-value_cd')
            }
          },
          cut_off_hour: {
            rules: { required },
            messages: {
              required: this.$t('trading_frequency.Validates.cut_off_hour')
            }
          },
          status: {
            rules: { required },
            messages: {
              required: this.$t('trading_frequency.Validates.status')
            }
          }
        }
      }
    },
    async created () {
      this.list_fund_company_id = await callApiFundCompanyGetList(this)
      this.status = await callApiTradingFrequencyGetStatus(this)
    },
    methods: {
       onChangeType (name, value) {
          if (value === '1') {
            console.log(value)
            this.showWday = true
            this.showMday = false
          } else {
            this.showWday = false
            this.showMday = true
          }
      },
      async onSubmit (params) {
        const result = await callApiTradingFrequencyCreate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_frequency.Create Success'),
            message: this.$t('trading_frequency.Create trading_frequency success')
          })
          this.$router.push(this.localePath('/trading-frequency'))
        } else {
          this.flashMessage.error({
            title: this.$t('trading_frequency.Create_error')
          })
        }
      }
    }
  }
</script>
<style>
  .star{
    color:red;
    font-size: 20px;
  }
</style>
