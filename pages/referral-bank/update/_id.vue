<template>
  <div v-if="referral_bank !== null" class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" enctype="multipart/form-data" @onSubmit="onSubmit">
        <div class="card">
          <div class="card-body">
            <b-input-hidden name="referral_bank_id" :value="referral_bank.id.toString()"></b-input-hidden>
            <b-input-hidden name="fund_company_id" :value="referral_bank.fund_company_id" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.name') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="referral_bank.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.trade') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="trade_name" type="text" :value="referral_bank.trade_name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('referral_bank.logo') }}</label>
              <div class="col-md-8">
                <b-input-file name="logo" type="file" />
              </div>
            </div>
            <b-input-hidden name="status" :value="referral_bank.status" />
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('referral_bank.update') }}</button>
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
import BInputFile from '@/components/UI/form/BInputFile'
import { callApiReferralBankDetail, callApiReferralBankUpdate, callApiReferralBankGetStatus } from '@/apis/referral_bank'
import { callApiFundCompanyGetList } from '@/apis/fund_company'
export default {
  components: {
    BForm,
    BInput,
    BInputFile
  },
  data () {
    return {
      referral_bank: null,
      // imageDisplay: false,
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
      const data = await callApiReferralBankDetail(this, { referral_bank_id: this.$route.params.id })
      if (data.status === true) {
        this.referral_bank = data.response
      } else {
        this.$nuxt.context.error(data)
      }
    },
    methods: {
      // UploadImage (e) {
      //   this.imageDisplay = true
      //   this.logo = this.$refs.newLogo.files[0]
      //   const reader = new FileReader()
      //   reader.addEventListener('load', function () {
      //     this.$refs.newLogoDisplay.src = reader.result
      //   }.bind(this), false)
      //   reader.readAsDataURL(this.logo)
      // },
      async onSubmit (params) {
        const result = await callApiReferralBankUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('referral_bank.Update Success')
          })
          this.$router.push(this.localePath('/referral-bank'))
        } else {
          this.flashMessage.error({
            title: this.$t('referral_bank.fail_update')
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
