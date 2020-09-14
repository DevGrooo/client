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
            <h4 class="card-title">{{ $t('investorBankAccount.Create Investor Bank Account') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Investor Name') }}</label>
              <div class="col-md-8">
                <b-select v-if="investors !== null" name="investor_id" :options="investors">
                  <option value="">{{ $t('investorBankAccount.Select Investor') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Bank Name') }}</label>
              <div class="col-md-8">
                <b-select v-if="banks !== null" name="bank_id" :options="banks">
                  <option value="">{{ $t('investorBankAccount.Select Bank') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Account Holder') }}</label>
              <div class="col-md-8">
                <b-input name="account_holder" type="text" class-css="form-control text-uppercase" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Account Number') }}</label>
              <div class="col-md-8">
                <b-input name="account_number" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Branch') }}</label>
              <div class="col-md-8">
                <b-input name="branch" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Description') }}</label>
              <div class="col-md-8">
                <b-textarea name="description" type="text" />
              </div>
            </div>
            <div class="row">
              <label class="col-md-3 col-form-label">{{ $t('investorBankAccount.Status') }}</label>
              <div class="col-md-3">
                <b-select v-if="status !== null" name="status" :options="status">
                  <option value="">{{ $t('investorBankAccount.Select status') }}</option>
                </b-select>
              </div>
              <div class="col-md-3">
                <b-checkbox name="is_default" value="1">{{ $t('investorBankAccount.Set Default') }}</b-checkbox>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-8">
                  <button type="submit" class="btn btn-primary">{{ $t('investorBankAccount.Create Investor Bank Account') }}</button>
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
import { accountHolder, accountNumber } from '@/components/UI/form/BValidate'
import { callApiInvestorBankAccountCreate, callApiInvestorBankAccountGetStatus } from '@/apis/investor_bank_account'
import { callApiInvestorGetList } from '@/apis/investor'
import { callApiBankGetList } from '@/apis/bank'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'
import BTextarea from '@/components/UI/form/BTextarea'
import BCheckbox from '@/components/UI/form/BCheckbox'

export default {
  components: {
    BInput,
    BSelect,
    BTextarea,
    BCheckbox,
    BForm
  },
  data () {
    return {
      banks: null,
      investors: null,
      status: null,
      validates: {
        bank_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investorBankAccount.validates.Bank is required'),
            integer: this.$t('investorBankAccount.validates.Bank invalid')
          }
        },
        investor_id: {
          rules: { required, integer },
          messages: {
            required: this.$t('investorBankAccount.validates.Investor is required'),
            integer: this.$t('investorBankAccount.validates.Investor invalid')
          }
        },
        account_holder: {
          rules: { required, accountHolder },
          messages: {
            required: this.$t('investorBankAccount.validates.Account Holder is required'),
            accountHolder: this.$t('investorBankAccount.validates.Account Holder invalid')
          }
        },
        account_number: {
          rules: { required, accountNumber },
          messages: {
            required: this.$t('investorBankAccount.validates.Account Number is required'),
            accountNumber: this.$t('investorBankAccount.validates.Account Number invalid')
          }
        },
        branch: {
          rules: { required, maxLength: maxLength(255) },
          messages: {
            required: this.$t('investorBankAccount.validates.Branch is required'),
            maxLength: this.$t('investorBankAccount.validates.Branch maxlength 255')
          }
        },
        description: {
          rules: { maxLength: maxLength(500) },
          messages: {
            maxLength: this.$t('investorBankAccount.validates.Description maxlength 500')
          }
        },
        status: {
          rules: { required, integer },
          messages: {
            required: this.$t('investorBankAccount.validates.Status is required'),
            integer: this.$t('investorBankAccount.validates.Status invalid')
          }
        }
      }
    }
  },
  async created () {
    this.investors = await callApiInvestorGetList(this)
    this.banks = await callApiBankGetList(this)
    this.status = await callApiInvestorBankAccountGetStatus(this)
  },
  methods: {
    async onSubmit (params) {
      const result = await callApiInvestorBankAccountCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investorBankAccount.Create Success'),
          message: this.$t('investorBankAccount.Create Success')
        })
        this.$router.push(this.localePath('/investor-bank-account'))
      } else {
        this.flashMessage.error({
          title: this.$t('investorBankAccount.Create Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
