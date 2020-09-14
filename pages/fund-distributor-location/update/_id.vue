<template>
  <div v-if="data" class="row">
    <div class="col-md-12">
      <b-form
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fundDistributorLocation.Update Fund Distributor Location') }}</h4>
          </div>
          <div class="card-body">
            <b-input-hidden name="fund_distributor_location_id" :value="data.id" />
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-input name="fund_distributor_name" type="text" :value="data.fund_distributor.name" :disabled="true" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" :value="data.name" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Address') }}</label>
              <div class="col-md-8">
                <b-textarea name="address" type="text" :value="data.address" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Phone') }}</label>
              <div class="col-md-8">
                <b-input name="phone" type="text" :value="data.phone" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Fax') }}</label>
              <div class="col-md-8">
                <b-input name="fax" type="text" :value="data.fax" />
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-info">{{ $t('fundDistributorLocation.Update Fund Distributor Location') }}</button>
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
import { required, maxLength } from 'vuelidate/lib/validators'
import { callApiFundDistributorLocationUpdate, callApiFundDistributorLocationDetail } from '@/apis/fund_distributor_location'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BInputHidden from '@/components/UI/form/BInputHidden'
import BTextarea from '@/components/UI/form/BTextarea'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    BInput,
    BInputHidden,
    BTextarea,
    BForm
  },
  data () {
    return {
      data: null,
      validates: {
        name: {
          rules: { required },
          messages: {
            required: 'Tên chi nhánh yêu cầu phải nhập'
          }
        },
        address: {
          rules: {},
          messages: {}
        },
        phone: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Số điện thoại không được nhập quá 255 ký tự'
          }
        },
        fax: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Fax không được nhập quá 255 ký tự'
          }
        }
      }
    }
  },
  async created () {
    const data = await callApiFundDistributorLocationDetail(this, { fund_distributor_location_id: this.$route.params.id })
    if (data.status === true) {
      this.data = data.response
    } else {
      this.$nuxt.context.error(data)
    }
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorLocationUpdate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorLocation.Update Success'),
          message: this.$t('fundDistributorLocation.Update Success')
        })
        this.$router.push('/fund-distributor-location')
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorLocation.Update Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
