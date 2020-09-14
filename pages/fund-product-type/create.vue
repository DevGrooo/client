<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" @onSubmit="onsubmit">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Name Fund Product Type') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Code Fund Product Type') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="code" type="text" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Description') }}</label>
              </div>
              <div class="col-md-8">
                <b-input name="description" type="text" />
              </div>
            </div>
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
import { callApiFundProductTypeCreate, callApiFundProductTypeGetStatus } from '@/apis/fund_product_type'
import { required, minLength, integer } from 'vuelidate/lib/validators'
import BForm from '~/components/UI/form/BForm'
import BInput from '~/components/UI/form/BInput'
import BSelect from '~/components/UI/form/BSelect'
export default {
    components: {
      BForm,
      BInput,
      BSelect
},
  data () {
      return {
        status: [],
        validates: {
          name: {
            rules: { required, minLength: minLength(6) },
            messages: {
              required: this.$t('fund_product_type.Validates name required'),
              minLength: this.$t('fund_product_type.Validates name minLength')
            }
          },
          code: {
            rules: { required, minLength: minLength(4) },
            messages: {
              required: this.$t('fund_product_type.Validates code required'),
              minLength: this.$t('fund_product_type.Validates code minLength')
            }
          },
          description: {
            rules: {},
            messages: {}
          },
          status: {
            rules: { required, integer },
            messages: {
              required: this.$t('fund_product_type.Validates status required'),
              integer: this.$t('fund_product_type.Validates status integer')
            }
          }
        }
      }
    },
  async created () {
    this.status = await callApiFundProductTypeGetStatus(this)
  },
  methods: {
   async onsubmit (params) {
        const result = await callApiFundProductTypeCreate(this, params)
     if (result.status === true) {
       this.flashMessage.success({
         title: this.$t('fund_product_type.Create Success'),
         message: this.$t('fund_product_type.Create fund product type Success')
       })
       this.$router.push(this.localePath('/fund-product-type'))
     } else {
       this.flashMessage.error({
         title: this.$t('fund_product_type.Create Error'),
         message: this.$t('fund_product_type.Create fund product type Error')
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
