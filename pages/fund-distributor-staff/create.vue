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
            <h4 class="card-title">{{ $t('fundDistributorStaff.Create Fund Distributor Staff') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Fund Distributor') }}</label>
              <div class="col-md-8">
                <b-select name="fund_distributor_id" :options="fundDistributors">
                  <option value="">{{ $t('fundDistributorStaff.Select Fund Distributor') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Staff Name') }}</label>
              <div class="col-md-8">
                <b-input name="name" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Certificate Number') }}</label>
              <div class="col-md-3">
                <b-input name="certificate_number" type="text" />
              </div>
              <label class="col-md-2 col-form-label text-right">{{ $t('fundDistributorStaff.Issuing Date') }}</label>
              <div class="col-md-3">
                <b-input name="issuing_date" type="date" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Email') }}</label>
              <div class="col-md-8">
                <b-input name="email" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Phone') }}</label>
              <div class="col-md-4">
                <b-input name="phone" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('fundDistributorStaff.Status') }}</label>
              <div class="col-md-3">
                <b-select name="status" :options="status">
                  <option value="">{{ $t('fundDistributorStaff.Select status') }}</option>
                </b-select>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-primary">{{ $t('fundDistributorStaff.Create Fund Distributor Staff') }}</button>
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
import { required, maxLength, integer, email } from 'vuelidate/lib/validators'
import { date, idNumber } from '@/components/UI/form/BValidate'
import { callApiFundDistributorStaffCreate, callApiFundDistributorStaffGetStatus } from '@/apis/fund_distributor_staff'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'

export default {
  components: {
    BInput,
    BSelect,
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
            required: 'Họ tên nhân viên yêu cầu phải nhập'
          }
        },
        certificate_number: {
          rules: { required, idNumber },
          messages: {
            required: 'Số CMND yêu cầu phải nhập',
            idNumber: 'Số CMND không hợp lệ'
          }
        },
        issuing_date: {
          rules: { required, date },
          messages: {
            required: 'Ngày cấp yêu cầu phải nhập',
            date: 'Ngày cấp không hợp lệ'
          }
        },
        email: {
          rules: { email },
          messages: {
            email: 'Email không hợp lệ'
          }
        },
        phone: {
          rules: { maxLength: maxLength(255) },
          messages: {
            maxLength: 'Số điện thoại không được nhập quá 255 ký tự'
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
    this.status = await callApiFundDistributorStaffGetStatus(this)
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiFundDistributorStaffCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorStaff.Create Success'),
          message: this.$t('fundDistributorStaff.Create Success')
        })
        this.$router.push(this.localePath('/fund-distributor-staff'))
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorStaff.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
