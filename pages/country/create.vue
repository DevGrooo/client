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
            <h4 class="card-title">{{ $t('country.add') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('country.name') }} <span class="star">*</span></label>
              <div class="col-md-8">
                <b-input
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('country.code') }} <span class="star">*</span> </label>
              <div class="col-md-8">
                <b-input
                  name="code"
                  type="text"
                />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('country.status') }} <span class="star">*</span></label>
              <div class="col-md-3">
                <b-select name="status" type="text" :options="status">
                  <option value="">-- {{ $t('country.status') }} --</option>
                </b-select>
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
  import { callApiCountryCreate, callApiCountryGetStatus } from '@/apis/country'
  export default {
    components: { BForm, BInput, BSelect },
    data () {
      return {
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
          },
          status: {
            rules: { required },
            messages: {
              required: this.$t('country.Validates status required')
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
        const result = await callApiCountryCreate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('country.Create Success'),
            message: this.$t('country.Create country success')
          })
          this.$router.push(this.localePath('/country'))
        } else {
          this.flashMessage.error({
            title: this.$t('country.fail_create')
          })
        }
      }
    }
  }

</script>

<style scoped>
  .star{
    color:red;
    font-size: 20px;
  }
</style>
