<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" enctype="multipart/form-data" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('trading_frequency.fund_company_name') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-select name="fund_company_id" type="text" :options="list_fund_company_id">
                  <option value="">-- {{ $t('fund_product.select_fund_company') }} --</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.name') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.trade') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="trade_name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.logo') }}</label>
              <div class="col-md-8">
                <b-input-file name="logo" type="file" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product_type.Status') }} <span class="star">*</span></label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('fund_product_type.Select status') }} </option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('referral_bank.Create new REFERRAL Bank') }}</button>
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
  import BInputFile from '@/components/UI/form/BInputFile'
  import { callApiReferralBankCreate, callApiReferralBankGetStatus } from '@/apis/referral_bank'
  import { callApiFundCompanyGetList } from '@/apis/fund_company'
  export default {
    components: {
      BForm,
      BInput,
      BSelect,
      BInputFile
    },
    data () {
      return {
        imageDisplay: false,
        list_fund_company_id: [],
        status: [],
        validates: {
          fund_company_id: {
            rules: { required },
            messages: {
              required: this.$t('referral_bank.Validates fund_company_id required')
            }
          },
          name: {
            rules: { required },
            messages: {
              required: this.$t('referral_bank.Validates name required')
            }
          },
          trade_name: {
            rules: { required },
            messages: {
              required: this.$t('referral_bank.Validates trade name required')
            }
          },
          status: {
            rules: { required },
            messages: {
              required: this.$t('referral_bank.Validates status required')
            }
          }
        }
      }
    },
    async created () {
      this.list_fund_company_id = await callApiFundCompanyGetList(this)
      this.status = await callApiReferralBankGetStatus(this)
    },
    methods: {
      UploadImage (e) {
        this.imageDisplay = true
        this.logo = this.$refs.newLogo.files[0]
        console.log(this.logo)
        const reader = new FileReader()
        reader.addEventListener('load', function () {
          this.$refs.newLogoDisplay.src = reader.result
        }.bind(this), false)
        reader.readAsDataURL(this.logo)
      },
      async onsubmit (params) {
        const result = await callApiReferralBankCreate(this, params)
        console.log(result)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('referral_bank.Create Success')
          })
          this.$router.push(this.localePath('/referral-bank'))
        } else {
          this.flashMessage.error({
            title: this.$t('referral_bank.fail_create')
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
