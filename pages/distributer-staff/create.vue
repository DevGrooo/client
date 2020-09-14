<template>
  <div class="content">
    <b-form css="form-horizontal" name="form" :validates="validates" :data="form" @onSubmit="onSubmit">
      <div class="card horizontal-form">
        <div class="card-header ">
          <h4 class="card-title">Sale man </h4>
        </div>
        <div class="card-body ">
          <div class="form-group">
            <div class="row">
              <label class="col-md-3 control-label">Distribution Agents</label>
              <div class="col-md-9">
                <b-select name="fund_distributor_id" type="text" :value="form.fund_distributor_id" :options="relist_fund_distributor_id" @input="setValue" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <label class="col-md-3 control-label">Full name</label>
              <div class="col-md-9">
                <b-input name="full_name" type="text" :value="form.name" @input="setValue" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <label class="col-md-3 control-label">Identification card number</label>
              <div class="col-md-9">
                <b-input name="certificate_number" type="text" :value="form.certificate_number" @input="setValue" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <label class="col-md-3 control-label">Phone </label>
              <div class="col-md-9">
                <b-input name="phone" type="text" :value="form.phone" @input="setValue" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <label class="col-md-3 control-label">Email </label>
              <div class="col-md-9">
                <b-input name="email" type="email" :value="form.email" @input="setValue" />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer ">
          <div class="col-md-9">
            <button type="submit" class="btn btn-fill btn-info">Save</button>
            <button class="btn btn-fill btn-info">Retype</button>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>
<script>
  import { required, email, numeric } from 'vuelidate/lib/validators'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  export default {
    components: {
      BForm,
      BInput,
      BSelect
    },
    data () {
      return {
        relist_fund_distributor_id: [
          { title: '9999', value: '1' },
          { title: '9998', value: '2' }
        ],
        form: {
          fund_distributor_id: '',
          full_name: '',
          certificate_number: '',
          phone: '',
          email: ''
        },
        validates: {
          fund_distributor_id: {
            rules: { required },
            messages: {
              required: 'Phải truyền giá trị ở Distribution Agents'
            }
          },
          full_name: {
            rules: { required },
            messages: {
              required: 'Full Name cần phải được nhập'
            }
          },
          certificate_number: {
            rules: { required, or: numeric },
            messages: {
              required: 'Identification card number phải nhập',
              or: 'Không đúng định dạng số'
            }
          },
          phone: {
            rules: { required, or: numeric },
            messages: {
              required: 'Phone phải nhập',
              or: 'Không đúng định dạng số'
            }
          },
          email: {
            rules: { required, email },
            messages: {
              required: 'Email phải nhập',
              email: 'Chưa đúng định dạng email'
            }
          }
        }
      }
    },
    methods: {
      setValue (name, value, error) {
        this.form[name] = value
      },
      async onSubmit () {
      }
    }
  }
</script>
