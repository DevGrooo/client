<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" enctype="multipart/form-data" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('bank.Name Bank') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('bank.Trade Name Bank') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="trade_name" type="text" />
              </div>
            </div>
            <!--          <div class="row">-->
            <!--            <label class="col-md-3 col-form-label">{{ $t('bank.logo') }}</label>-->
            <!--            <div class="col-md-8">-->
            <!--              <b-input name="logo" type="file" @change="UploadImage" ref="newLogo" />-->
            <!--              <img v-if="imageDisplay==true" ref="newLogoDisplay" alt="" >-->
            <!--            </div>-->
            <!--          </div>-->
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Status') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('fund_product_type.Select status') }}</option>
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
  import { integer, required, minLength } from 'vuelidate/lib/validators'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  import { callApiBankCreate, callApiBankGetStatus } from '@/apis/bank'
  export default {
    components: {
      BForm,
      BInput,
      BSelect
    },
    data () {
      return {
        imageDisplay: false,
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
          },
          status: {
            rules: { required, integer },
            messages: {
              required: this.$t('bank.Validates status required'),
              integer: this.$t('bank.Validates status integer')
            }
          }
        }
      }
    },
    async created () {
      this.status = await callApiBankGetStatus(this)
    },
    methods: {
      UploadImage (e) {
        this.imageDisplay = true
        this.logo = this.$refs.newLogo.files[0]
        const reader = new FileReader()
        reader.addEventListener('load', function () {
          this.$refs.newLogoDisplay.src = reader.result
        }.bind(this), false)
        reader.readAsDataURL(this.logo)
      },
      async onsubmit (params) {
        const result = await callApiBankCreate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('bank.Create Success'),
            message: this.$t('bank.Create bank Success')
          })
          this.$router.push(this.localePath('/bank'))
        } else {
          this.flashMessage.error({
            title: this.$t('bank.Create Error'),
            message: this.$t('bank.Create bank Error')
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
