<template>
  <div v-if="fund_product !== null" class="row">
    <div class="col-md-12">
      <b-form
        name="formCreate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fund_product.edit_fund_product') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_product_id" :value="fund_product.id.toString()" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product.fund_company_id') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-select name="fund_company_id" :disabled="true" :value="fund_product.fund_company_id" type="text" :options="relist_fund_company_id">
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product.fund_certificate') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-select name="fund_certificate_id" type="text" :disabled="true" :value="fund_product.fund_certificate_id" :options="relist_fund_certificate_id">
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product.fund_product_type') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-select name="fund_product_type_id" type="text" :disabled="true" :value="fund_product.fund_product_type_id" :options="relist_fund_product_type_id">
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product.name') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="fund_product.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product.code') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="code" type="text" :disabled="true" :value="fund_product.code" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fund_product_type.Description') }}</label>
              <div class="col-md-8">
                <b-input name="description" :value="fund_product.description" type="text" />
              </div>
            </div>
            <b-input-hidden name="status" :value="fund_product.status" />
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
  import { callApiFundCompanyGetList } from '@/apis/fund_company'
  import { callApiFundCertificateGetList } from '@/apis/fund_certificate'
  import { callApiFundProductTypeGetList } from '@/apis/fund_product_type'
  import { callApiFundProductUpdate, callApiFundProductStatus, callApiFundProductDetail } from '@/apis/fund_product'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BInputHidden from '@/components/UI/form/BInputHidden'
  import BSelect from '@/components/UI/form/BSelect'
  export default {
    validate ({ params }) {
      return new RegExp(/^\d+$/).test(params.id)
    },
    components: {
      BForm,
      BInput,
      BInputHidden,
      BSelect
    },
    data () {
      return {
        fund_product: null,
        relist_fund_company_id: [],
        relist_fund_certificate_id: [],
        relist_fund_product_type_id: [],
        status: [],
        validates: {
          fund_company_id: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates fund_company_id required')
            }
          },
          fund_certificate_id: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates fund_certificate_id required')
            }
          },
          fund_product_type_id: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates fund_product_type_id required')
            }
          },
          name: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates name required')
            }
          },
          code: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates code required')
            }
          },
          status: {
            rules: { required },
            messages: {
              required: this.$t('fund_product.Validates status required')
            }
          }
        }
      }
    },
    async created () {
      this.relist_fund_company_id = await callApiFundCompanyGetList(this)
      this.relist_fund_certificate_id = await callApiFundCertificateGetList(this)
      this.relist_fund_product_type_id = await callApiFundProductTypeGetList(this)
      this.status = await callApiFundProductStatus(this)
      const data = await callApiFundProductDetail(this, { fund_product_id: this.$route.params.id })
      if (data.status === true) {
        this.fund_product = data.response
      } else {
        this.$nuxt.context.error(data)
      }
    },
    methods: {
      async onSubmit (params) {
        const result = await callApiFundProductUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product.Update Success'),
            message: this.$t('fund_product.Update fund_product success')
          })
          this.$router.push(this.localePath('/fund-product'))
        } else {
          this.flashMessage.error({
            title: this.$t('fail_update')
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
