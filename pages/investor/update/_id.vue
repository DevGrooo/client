<template>
  <b-form
    v-if="data !== null"
    name="formUpdateInvestor"
    :validates="validates"
    :data="data"
    css="form-horizontal"
    @onSubmit="onSubmit"
  >
    <div class="card ">
      <div class="card-header ">
        <h4 class="card-title">{{ $t('investor.Update Investor') }}</h4>
      </div>
      <div class="card-body ">
        <p>{{ $t('investor.Account Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Distributor Agents') }}</label>
          <div class="col-md-4">
            <b-input-hidden name="investor_id" />
            <b-input-hidden name="fund_distributor_code" />
            <b-input name="fund_distributor_name" :disabled="true" />
          </div>
        </div>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Classification of Investors') }}</label>
          <div class="col-md-4">
            <b-select name="zone_type" :options="zone_types">
              <option value="">{{ $t('investor.Select Classification of Investors') }}</option>
            </b-select>
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Type of accounts') }}</label>
          <div class="col-md-4">
            <b-select name="trading_account_type" :options="trading_account_types">
              <option value="">{{ $t('investor.Select Type of accounts') }}</option>
            </b-select>
          </div>
        </div>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Trading Account') }}</label>
          <div class="col-md-4">
            <b-input name="trading_account_number" type="text" class-css="form-control text-uppercase" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Types of Investments') }}</label>
          <div class="col-md-4">
            <b-select name="invest_type" :options="invest_types">
              <option value="">{{ $t('investor.Select Types of Investments') }}</option>
            </b-select>
          </div>
        </div>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Types of Investor') }}</label>
          <div class="col-md-4">
            <b-select name="scale_type" :options="scale_types">
              <option value="">{{ $t('investor.Select Types of Investor') }}</option>
            </b-select>
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Sale Man') }}</label>
          <div class="col-md-4">
            <b-select name="fund_distributor_staff_id" :options="fund_distributor_staffs">
              <option value="">{{ $t('investor.Select Sale Man') }}</option>
            </b-select>
          </div>
        </div>
        <p>{{ $t('investor.Investor Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Full Name') }}</label>
          <div class="col-md-6">
            <b-input name="name" type="text" class-css="form-control text-uppercase" />
          </div>
          <label class="col-md-2 col-form-label text-right">{{ $t('investor.Gender') }}</label>
          <div class="col-md-2 text-right">
            <b-group-radio name="gender" :options="genders" />
          </div>
        </div>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Date of birth') }}</label>
          <div class="col-md-2">
            <b-input name="birthday" type="date" />
          </div>
          <div class="col-md-2"></div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Nationality') }}</label>
          <div class="col-md-4">
            <b-select name="country_id" :options="countries">
              <option value="">{{ $t('investor.Select Country') }}</option>
            </b-select>
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Types of ID Code') }}</label>
          <div class="col-md-3">
            <b-select name="id_type" :options="id_types">
              <option value="">{{ $t('investor.Select Types of ID Code') }}</option>
            </b-select>
          </div>
          <div class="col-md-1"></div>
          <label class="col-md-2 col-form-label">{{ $t('investor.ID Code') }}</label>
          <div class="col-md-4">
            <b-input name="id_number" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Date of Issue') }}</label>
          <div class="col-md-2">
            <b-input name="id_issuing_date" type="date" />
          </div>
          <div class="col-md-2"></div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Place of Issue') }}</label>
          <div class="col-md-4">
            <b-input name="id_issuing_place" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Tax Code') }}</label>
          <div class="col-md-4">
            <b-input name="tax_id" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Email') }}</label>
          <div class="col-md-4">
            <b-input name="email" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Phone Number') }}</label>
          <div class="col-md-4">
            <b-input name="phone" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Fax Number') }}</label>
          <div class="col-md-4">
            <b-input name="fax" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Address') }}</label>
          <div class="col-md-10">
            <b-textarea name="current_address" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Place of permanent') }}</label>
          <div class="col-md-10">
            <b-textarea name="permanent_address" />
          </div>
        </div>

        <p>{{ $t('investor.Bank Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Bank Account Number') }}</label>
          <div class="col-md-4">
            <b-input name="account_number" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Account Holder Name') }}</label>
          <div class="col-md-4">
            <b-input name="account_holder" type="text" class-css="form-control text-uppercase" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Bank Name') }}</label>
          <div class="col-md-4">
            <b-select name="bank_id" :options="banks">
              <option value="">{{ $t('investor.Select Bank Name') }}</option>
            </b-select>
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Branch') }}</label>
          <div class="col-md-4">
            <b-input name="branch" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Description') }}</label>
          <div class="col-md-10">
            <b-textarea name="description" />
          </div>
        </div>

        <p>{{ $t('investor.Legal Representatives Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Fullname') }}</label>
          <div class="col-md-6">
            <b-input name="re_fullname" type="text" class-css="form-control text-uppercase" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Position') }}</label>
          <div class="col-md-2">
            <b-input name="re_position" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.ID Code') }}</label>
          <div class="col-md-2">
            <b-input name="re_id_number" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Date of Issue') }}</label>
          <div class="col-md-2">
            <b-input name="re_id_issuing_date" type="date" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Place of Issue') }}</label>
          <div class="col-md-2">
            <b-input name="re_id_issuing_place" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Phone Number') }}</label>
          <div class="col-md-2">
            <b-input name="re_phone" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Country') }}</label>
          <div class="col-md-2">
            <b-select name="re_country_id" :options="countries">
              <option value="">{{ $t('investor.Select Country') }}</option>
            </b-select>
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Address') }}</label>
          <div class="col-md-10">
            <b-textarea name="re_address" type="text" />
          </div>
        </div>

        <p>{{ $t('investor.Authorized Person Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Fullname') }}</label>
          <div class="col-md-6">
            <b-input name="au_fullname" type="text" class-css="form-control text-uppercase" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.ID Code') }}</label>
          <div class="col-md-2">
            <b-input name="au_id_number" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Date of Issue') }}</label>
          <div class="col-md-2">
            <b-input name="au_id_issuing_date" type="date" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Place of Issue') }}</label>
          <div class="col-md-2">
            <b-input name="au_id_issuing_place" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Phone Number') }}</label>
          <div class="col-md-2">
            <b-input name="au_phone" type="text" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.Country') }}</label>
          <div class="col-md-2">
            <b-select name="au_country_id" :options="countries">
              <option value="">{{ $t('investor.Select Country') }}</option>
            </b-select>
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Address') }}</label>
          <div class="col-md-10">
            <b-textarea name="au_address" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Start Date') }}</label>
          <div class="col-md-2">
            <b-input name="au_start_date" type="date" />
          </div>
          <label class="col-md-2 col-form-label">{{ $t('investor.End Date') }}</label>
          <div class="col-md-2">
            <b-input name="au_end_date" type="date" />
          </div>
        </div>

        <p>{{ $t('investor.Other Information') }}</p>
        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.LinkAUTH') }}</label>
          <div class="col-md-10">
            <b-input name="fatca_link_auth" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Recode') }}</label>
          <div class="col-md-10">
            <b-input name="fatca_recode" type="text" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.Fund Code') }}</label>
          <div class="col-md-10">
            <b-input-tag name="fatca_funds" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.FATCA1') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca1" :options="fatca_options" />
          </div>
          <div class="col-md-1"></div>
          <label class="col-md-1 col-form-label">{{ $t('investor.FATCA2') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca2" :options="fatca_options" />
          </div>
          <div class="col-md-1"></div>
          <label class="col-md-1 col-form-label">{{ $t('investor.FATCA3') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca3" :options="fatca_options" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.FATCA4') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca4" :options="fatca_options" />
          </div>
          <div class="col-md-1"></div>
          <label class="col-md-1 col-form-label">{{ $t('investor.FATCA5') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca5" :options="fatca_options" />
          </div>
          <div class="col-md-1"></div>
          <label class="col-md-1 col-form-label">{{ $t('investor.FATCA6') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca6" :options="fatca_options" />
          </div>
        </div>

        <div class="row">
          <label class="col-md-2 col-form-label">{{ $t('investor.FATCA7') }}</label>
          <div class="col-md-2">
            <b-group-radio name="fatca7" :options="fatca_options" />
          </div>
        </div>

      </div>
      <div class="card-footer ">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10">
            <button type="submit" class="btn btn-primary">{{ $t('investor.Update Investor') }}</button>
          </div>
        </div>
      </div>
    </div>
  </b-form>
</template>
<script>
  import { required, integer, maxLength, email } from 'vuelidate/lib/validators'
  import { accountHolder, accountNumber, date, idNumber, isTradingAccountNumber } from '@/components/UI/form/BValidate'
  import {
    callApiInvestorDetail,
    callApiInvestorGetGenders,
    callApiInvestorGetIdTypes,
    callApiInvestorGetScaleTypes,
    callApiInvestorGetInvestTypes,
    callApiInvestorGetZoneTypes,
    callApiInvestorGetTradingAccountTypes,
    callApiInvestorUpdate
  } from '@/apis/investor'
  import { callApiFundDistributorStaffGetList } from '@/apis/fund_distributor_staff'
  import { callApiCountryGetList } from '@/apis/country'
  import { callApiBankGetList } from '@/apis/bank'
  import BForm from '@/components/UI/form/BForm'
  import BInput from '@/components/UI/form/BInput'
  import BSelect from '@/components/UI/form/BSelect'
  import BTextarea from '@/components/UI/form/BTextarea'
  import BGroupRadio from '@/components/UI/form/BGroupRadio'
  import BInputTag from '@/components/UI/form/BInputTag'

  export default {
    validate ({ params }) {
      return new RegExp(/^\d+$/).test(params.id)
    },
    components: {
      BInput,
      BForm,
      BSelect,
      BTextarea,
      BGroupRadio,
      BInputTag
    },
    data () {
      return {
        data: null,
        fatca_options: [
          { title: this.$t('common.Yes'), value: 1 },
          { title: this.$t('common.No'), value: 2 }
        ],
        genders: [],
        countries: [],
        banks: [],
        id_types: [],
        scale_types: [],
        invest_types: [],
        zone_types: [],
        trading_account_types: [],
        fund_distributor_staffs: [],
        // validates inputs
        validates: {
          account_holder: {
            rules: { required, accountHolder },
            messages: {
              required: this.$t('investor.Account holder is required'),
              accountHolder: this.$t('investor.Account holder invalid')
            }
          },
          account_number: {
            rules: { required, accountNumber },
            messages: {
              required: this.$t('investor.Account number is required'),
              accountNumber: this.$t('investor.Account number invalid')
            }
          },
          au_address: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Authorized address is required'),
              maxLength: this.$t('investor.Authorized address maxlength 500')
            }
          },
          au_country_id: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Authorized Country is required'),
              integer: this.$t('investor.Authorized Country invalid')
            }
          },
          au_end_date: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.Authorized End Date is required'),
              date: this.$t('investor.Authorized End Date invalid')
            }
          },
          au_fullname: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Authorized Fullname is required'),
              maxLength: this.$t('investor.Authorized Fullname maxlength 255')
            }
          },
          au_id_issuing_date: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.Authorized ID issuing date is required'),
              date: this.$t('investor.Authorized ID issuing date invalid')
            }
          },
          au_id_issuing_place: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Authorized ID Issuing Place is required'),
              maxLength: this.$t('investor.Authorized ID Issuing Place max length 500')
            }
          },
          au_id_number: {
            rules: { required, idNumber },
            messages: {
              required: this.$t('investor.Authorized ID Number is required'),
              idNumber: this.$t('investor.Authorized ID Number invalid')
            }
          },
          au_phone: {
            rules: { required, maxLength: maxLength(50) },
            messages: {
              required: this.$t('investor.Authorized Phone is required'),
              maxLength: this.$t('investor.Authorized Phone max length 50')
            }
          },
          au_start_date: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.Authorized Start date is required'),
              date: this.$t('investor.Authorized Start date invalid')
            }
          },
          bank_id: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Bank is required'),
              integer: this.$t('investor.Bank invalid')
            }
          },
          birthday: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.Birthday is required'),
              date: this.$t('investor.Birthday invalid')
            }
          },
          branch: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Branch is required'),
              maxLength: this.$t('investor.Branch max length 255')
            }
          },
          country_id: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Country is required'),
              integer: this.$t('investor.Country invalid')
            }
          },
          current_address: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Address is required'),
              maxLength: this.$t('investor.Address max length 500')
            }
          },
          description: {
            rules: { maxLength: maxLength(500) },
            messages: {
              maxLength: this.$t('investor.Description max length 500')
            }
          },
          email: {
            rules: { required, email },
            messages: {
              required: this.$t('investor.Email is required'),
              email: this.$t('investor.Email invalid')
            }
          },
          fatca1: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca1 is required'),
              integer: this.$t('investor.Fatca1 country invalid')
            }
          },
          fatca2: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca2 is required'),
              integer: this.$t('investor.Fatca2 country invalid')
            }
          },
          fatca3: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca3 is required'),
              integer: this.$t('investor.Fatca3 country invalid')
            }
          },
          fatca4: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca4 is required'),
              integer: this.$t('investor.Fatca4 country invalid')
            }
          },
          fatca5: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca5 is required'),
              integer: this.$t('investor.Fatca5 country invalid')
            }
          },
          fatca6: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca6 is required'),
              integer: this.$t('investor.Fatca6 country invalid')
            }
          },
          fatca7: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Fatca7 is required'),
              integer: this.$t('investor.Fatca7 country invalid')
            }
          },
          fatca_funds: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Fatca Funds is required'),
              maxLength: this.$t('investor.Fatca Funds max length 255')
            }
          },
          fatca_link_auth: {
            rules: { maxLength: maxLength(255) },
            messages: {
              maxLength: this.$t('investor.Fatca Link Auth max length 255')
            }
          },
          fatca_recode: {
            rules: { maxLength: maxLength(255) },
            messages: {
              maxLength: this.$t('investor.Fatca Recode max length 255')
            }
          },
          fax: {
            rules: { maxLength: maxLength(50) },
            messages: {
              maxLength: this.$t('investor.Fax max length 50')
            }
          },
          fund_distributor_staff_id: {
            rules: { integer },
            messages: {
              integer: this.$t('investor.Sale Man invalid')
            }
          },
          gender: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Gender is required'),
              integer: this.$t('investor.Gender invalid')
            }
          },
          id_issuing_date: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.ID issuing date required'),
              date: this.$t('investor.ID issuing date invalid')
            }
          },
          id_issuing_place: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.ID Issuing Place is required'),
              maxLength: this.$t('investor.ID Issuing Place max length 500')
            }
          },
          id_number: {
            rules: { required, idNumber },
            messages: {
              required: this.$t('investor.ID Number is required'),
              idNumber: this.$t('investor.ID Number invalid')
            }
          },
          id_type: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.ID Type required'),
              integer: this.$t('investor.ID Type invalid')
            }
          },
          invest_type: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Invest Type is required'),
              integer: this.$t('investor.Invest Type invalid')
            }
          },
          name: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Name is required'),
              maxLength: this.$t('investor.Name max length 255')
            }
          },
          permanent_address: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Permanent Address is required'),
              maxLength: this.$t('investor.Permanent Address max length 500')
            }
          },
          phone: {
            rules: { required, maxLength: maxLength(50) },
            messages: {
              required: this.$t('investor.Phone is required'),
              maxLength: this.$t('investor.Phone max length 50')
            }
          },
          re_address: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Representative Address is required'),
              maxLength: this.$t('investor.Representative Address max length 500')
            }
          },
          re_country_id: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Representative country is required'),
              integer: this.$t('investor.Representative country invalid')
            }
          },
          re_fullname: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Representative Fullname is required'),
              maxLength: this.$t('investor.Representative Fullname max length 255')
            }
          },
          re_id_issuing_date: {
            rules: { required, date },
            messages: {
              required: this.$t('investor.Representative iD issuing date required'),
              date: this.$t('investor.Representative iD issuing date invalid')
            }
          },
          re_id_issuing_place: {
            rules: { required, maxLength: maxLength(500) },
            messages: {
              required: this.$t('investor.Representative ID Issuing Place is required'),
              maxLength: this.$t('investor.Representative ID Issuing Place max length 500')
            }
          },
          re_id_number: {
            rules: { required, idNumber },
            messages: {
              required: this.$t('investor.Representative ID Number is required'),
              idNumber: this.$t('investor.Representative ID Number invalid')
            }
          },
          re_phone: {
            rules: { required, maxLength: maxLength(50) },
            messages: {
              required: this.$t('investor.Representative Phone is required'),
              maxLength: this.$t('investor.Representative Phone max length 50')
            }
          },
          re_position: {
            rules: { required, maxLength: maxLength(255) },
            messages: {
              required: this.$t('investor.Representative Position is required'),
              maxLength: this.$t('investor.Representative Position max length 255')
            }
          },
          scale_type: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Scale type is required'),
              integer: this.$t('investor.Scale type invalid')
            }
          },
          tax_id: {
            rules: { required, maxLength: maxLength(20) },
            messages: {
              required: this.$t('investor.Tax ID is required'),
              maxLength: this.$t('investor.Tax ID max length 20')
            }
          },
          trading_account_number: {
            rules: { required, tradingAccountNumber: isTradingAccountNumber },
            messages: {
              required: this.$t('investor.Trading Account Number is required'),
              tradingAccountNumber: this.$t('investor.Trading Account Number invalid')
            }
          },
          trading_account_type: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Trading Account Type is required'),
              integer: this.$t('investor.Trading Account Type invalid')
            }
          },
          zone_type: {
            rules: { required, integer },
            messages: {
              required: this.$t('investor.Zone Type is required'),
              integer: this.$t('investor.Zone Type invalid')
            }
          }
        }
      }
    },
    async created () {
      const data = await callApiInvestorDetail(this, { investor_id: this.$route.params.id })
      if (data.status === true) {
        this.data = data.response
        this.genders = await callApiInvestorGetGenders(this)
        this.countries = await callApiCountryGetList(this)
        this.banks = await callApiBankGetList(this)
        this.id_types = await callApiInvestorGetIdTypes(this)
        this.scale_types = await callApiInvestorGetScaleTypes(this)
        this.invest_types = await callApiInvestorGetInvestTypes(this)
        this.zone_types = await callApiInvestorGetZoneTypes(this)
        this.trading_account_types = await callApiInvestorGetTradingAccountTypes(this)
        this.fund_distributor_staffs = await callApiFundDistributorStaffGetList(this)
      } else {
        this.$nuxt.context.error(data)
      }
    },
    methods: {
      async onSubmit (params) {
        const result = await callApiInvestorUpdate(this, params)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('investor.Update Success'),
            message: this.$t('investor.Update Success')
          })
          this.$router.push(this.localePath('/investor'))
        } else {
          this.flashMessage.error({
            title: this.$t('investor.Update Error'),
            message: result.message
          })
        }
      }
    }
  }
</script>
