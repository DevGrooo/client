<template>
  <div v-if="fund_product_type !== null" class="row">
    <div class="col-md-12">
      <b-form name="formUpdate" :validates="validates" css="form-horizontal" @onSubmit="onSubmit">
        <div class="card">
          <div class="card-body">
            <b-input-hidden name="fund_product_type_id" :value="fund_product_type.id.toString()" />
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Name Fund Product Type') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="fund_product_type.name" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="col-form-label">{{ $t('fund_product_type.Code Fund Product Type') }}</label>
                <span class="Obligatory">*</span>
              </div>
              <div class="col-md-8">
                <b-input name="code" :disabled="true" type="text" :value="fund_product_type.code" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product_type.Description') }}</label>
              <div class="col-md-8">
                <b-input name="description" type="text" :value="fund_product_type.description" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('fund_product_type.Update Fund Product Type') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import { callApiFundProductTypeDetail, callApiFundProductTypeUpdate } from '@/apis/fund_product_type'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BInputHidden from '@/components/UI/form/BInputHidden'
  export default {
    validate ({ params }) {
      return new RegExp(/^\d+$/).test(params.id)
    },
    components: {
      BForm,
      BInput,
      BInputHidden
    },
    async fetch () {
      const data = await callApiFundProductTypeDetail(this, { fund_product_type_id: this.$route.params.id })
      if (data.status === true) {
        this.fund_product_type = data.response
      } else {
        this.$nuxt.context.error(data)
      }
    },
    data () {
      return {
        fund_product_type: null,
        status: [],
        validates: {
          name: {
            rules: { required, minLength: minLength(6) },
            messages: {
              required: this.$t('fund_product_type.Validates name required'),
              minLength: this.$t('fund_product_type.Validates name minLength')
            }
          },
          description: {
            rules: {},
            messages: {}
          }
        }
      }
    },
    methods: {
      async onSubmit (params) {
        const result = await callApiFundProductTypeUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product_type.Update Success'),
            message: this.$t('fund_product_type.Update fund product type Success')
          })
          this.$router.push(this.localePath('/fund-product-type'))
        } else {
          this.flashMessage.error({
            title: this.$t('fund_product_type.Update Error'),
            message: this.$t('fund_product_type.Update fund product type Error')
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
