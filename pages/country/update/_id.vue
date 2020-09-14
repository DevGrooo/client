<template>
  <div v-if="country !== null" class="row">
    <div class="col-md-12">
      <b-form
        name="formCreate"
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('country.update') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="country_id" :value="country.id.toString()" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('country.name') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="country.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('country.code') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input name="code" type="text" :value="country.code" />
              </div>
            </div>
            <b-input-hidden name="status" :value="country.status" />
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
  import { callApiCountryUpdate, callApiCountryGetStatus, callApiCountryDetail } from '@/apis/country'
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
      const data = await callApiCountryDetail(this, { country_id: this.$route.params.id })
      if (data.status === true) {
        this.country = data.response
      } else {
        this.$nuxt.context.error(data)
      }
    },
    data () {
      return {
        country: null,
        status: [],
        validates: {
          name: {
            rules: { required },
            messages: {
              required: this.$t('country.Validates name required')
            }
          },
          code: {
            rules: { required },
            messages: {
              required: this.$t('country.Validates code required')
            }
          }
        }
      }
    },
    async created () {
      this.status = await callApiCountryGetStatus(this)
    },
    methods: {
      async onSubmit (params) {
        const result = await callApiCountryUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('country.Update Success'),
            message: this.$t('country.Update country success')
          })
          this.$router.push(this.localePath('/country'))
        } else {
          this.flashMessage.error({
            title: this.$t('country.fail_update')
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
