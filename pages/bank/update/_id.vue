<template>
  <div v-if="bank !== null" class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" enctype="multipart/form-data" @onSubmit="onSubmit">
        <div class="card">
          <div class="card-body">
            <b-input-hidden name="bank_id" :value="bank.id.toString()"></b-input-hidden>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('bank.Name Bank') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="bank.name" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('bank.Trade Name Bank') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="trade_name" type="text" :value="bank.trade_name" />
              </div>
            </div>
            <!--            <div class="row">-->
            <!--              <label class="col-md-3 col-form-label">{{ $t('bank.logo') }}</label>-->
            <!--              <div class="col-md-8">-->
            <!--                <b-input name="logo" type="file" @change="UploadImage" ref="newLogo" :value="bank.logo" />-->
            <!--                <img v-if="imageDisplay==true" ref="newLogoDisplay" alt="" >-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('bank.Update Bank') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { minLength, required } from 'vuelidate/lib/validators'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import { callApiBankDetail, callApiBankUpdate } from '@/apis/bank'
export default {
  components: {
    BForm,
    BInput
  },
  async fetch () {
    const data = await callApiBankDetail(this, { bank_id: this.$route.params.id })
    if (data.status === true) {
      this.bank = data.response
    } else {
      this.$nuxt.context.error(data)
    }
  },
  data () {
    return {
      bank: null,
      // imageDisplay: false,
      status: [],
      validates: {
        name: {
          rules: { required, minLength: minLength(3) },
          messages: {
            required: this.$t('bank.Validates name required'),
            minLength: this.$t('bank.Validates name minLength')
          }
        },
        trade_name: {
          rules: { required, minLength: minLength(3) },
          messages: {
            required: this.$t('bank.Validates trade name required'),
            minLength: this.$t('bank.Validates trade name minLength')
          }
        }
      }
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
        const result = await callApiBankUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('bank.Update Success'),
            message: this.$t('bank.Update bank Success')
          })
          this.$router.push(this.localePath('/bank'))
        } else {
          this.flashMessage.error({
            title: this.$t('bank.Update Error'),
            message: this.$t('bank.Update bank Error')
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
