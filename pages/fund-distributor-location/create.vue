<template>
  <div class="row">
    <div class="col-md-12">
      <b-form
        :validates="validates"
        css="form-horizontal"
        @onSubmit="onSubmit"
      >
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('fundDistributorLocation.Create Fund Distributor Location') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-select name="fund_distributor_id" :options="fundDistributors">
                  <option value="">{{ $t('fundDistributorLocation.Select Fund Distributor') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Address') }}</label>
              <div class="col-md-8">
                <b-textarea name="address" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Phone') }}</label>
              <div class="col-md-8">
                <b-input name="phone" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Fax') }}</label>
              <div class="col-md-8">
                <b-input name="fax" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorLocation.Status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('fundDistributorLocation.Select status') }}</option>
                </b-select>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-info">{{ $t('fundDistributorLocation.Create Fund Distributor Location') }}</button>
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
import { required, maxLength, integer } from 'vuelidate/lib/validators'
import { callApiFundDistributorLocationCreate, callApiFundDistributorLocationGetStatus } from '@/apis/fund_distributor_location'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'
import BTextarea from '@/components/UI/form/BTextarea'

export default {
  components: {
    BInput,
    BSelect,
    BTextarea,
    BForm
  },
  data () {
    return {
      fundDistributors: [],
      status: [],
      validates: {
        fund_distributor_id: {
          rules: { required, integer },
          messages: {
            required: 'Đại lý phân phối yêu cầu phải chọn',
            integer: 'Đại lý phân phối không hợp lệ'
          }
        },
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
        },
        status: {
          rules: { required, integer },
          messages: {
            required: 'Trạng thái yêu cầu phải chọn',
            integer: 'Trạng thái không hợp lệ'
          }
        }
      }
    }
  },
  async created () {
    this.fundDistributors = await callApiFundDistributorGetList(this)
    this.status = await callApiFundDistributorLocationGetStatus(this)
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorLocationCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorLocation.Create Success'),
          message: this.$t('fundDistributorLocation.Create Success')
        })
        this.$router.push('/fund-distributor-location')
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorLocation.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
