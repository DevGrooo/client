<template>
  <div class="row">
    <div class="col-md-12">
      <b-form name="formCreate" :validates="validates" css="form-horizontal" @onSubmit="onSubmit">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('setting_commission.create setting commission') }}</h4>
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('setting_commission.type of agent') }}</label>
              <div class="col-md-2">
                <b-select name="fund_distributor_id" :options="fundDistributors">
                  <option value>{{ $t('setting_commission.select type of agent') }}</option>
                </b-select>
              </div>
            </div>
            <div class="row">
              <label class="col-md-2 col-form-label">{{ $t('setting_commission.application date') }}</label>
              <div class="col-md-2">
                <b-input name="start_at" type="date" />
              </div>
            </div>
          </div>
          <div class="card" style="padding-left: 15px">
            <div class="card-header">
              <h4 class="card-title">{{ $t('setting_commission.amount of investment') }}</h4>
            </div>
            <div class="card-body">
              <div v-for="(item, index) in lines" :key="index" class="row">
                <label class="col-form-label">{{ $t('setting_commission.target') }}</label>
                <div class="col-md-2">
                  <input v-model="item.min_amount" v-validate="{ required }" type="text" />
                </div>
                <label class="col-form-label">{{ $t('setting_commission.sell fee') }}</label>
                <div class="col-md-2">
                  <input v-model="item.sell_commission" type="text" />
                </div>
                <label class="col-form-label">{{ $t('setting_commission.holding fee') }}</label>
                <div class="col-md-2">
                  <input v-model="item.maintance_commission_amount" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <button class="btn btn-primary float-right" @click="addNewRow">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <!-- <div class="hobbies">
            <h3>Add some Hobbies</h3>
            <button type="button" @click="onAddHobby">Add Hobby</button>
            <div class="hobby-list">
              <div
                v-for="(hobbyInput, index) in hobbyInputs"
                :key="hobbyInput.id"
                class="input"
                :class="{invalid: $v.hobbyInputs.$each[index].$error}"
              >
                <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                <input
                  :id="hobbyInput.id"
                  v-model="hobbyInput.value"
                  type="text"
                  @blur="$v.hobbyInputs.$each[index].value.$touch()"
                />
                <button type="button" @click="onDeleteHobby(hobbyInput.id)">X</button>
              </div>
              <p
                v-if="!$v.hobbyInputs.minLen"
              >You have to specify at least {{ $v.hobbyInputs.$params.minLen.min }} hobbies.</p>
              <p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
            </div>
          </div> -->
          <div class="card-footer">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-8">
                <button type="submit" class="btn btn-info">{{ $t('fund_certificate.add new') }}</button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, integer } from 'vuelidate/lib/validators'
import { date } from '@/components/UI/form/BValidate'
import BForm from '@/components/UI/form/BForm'
import BInput from '@/components/UI/form/BInput'
import BSelect from '@/components/UI/form/BSelect'
import {
  callApiSettingCommissionCreate,
  callApiSettingCommissionGetListFundDistributor
} from '@/apis/setting_commission'

export default {
  components: {
    BForm,
    BInput,
    BSelect
  },
  data () {
    return {
      error: null,
      fundDistributors: [],
      lines: [
        { min_amount: '', sell_commission: '', maintance_commission_amount: '' }
      ],
      hobbyInputs: [],
      validates: {
        fund_distributor_id: {
          rules: { required, integer },
          messages: {
            required: this.$t(
              'setting_commission.fund distributor is required'
            ),
            integer: this.$t('setting_commission.fund is invalid')
          }
        },
        start_at: {
          rules: { required, date },
          messages: {
            required: this.$t('setting_commission.start at is required'),
            date: this.$t('setting_commission.start at is invalid')
          }
        }
        // hobbyInputs: {
        //   required,
        //   minLen: minLength(2),
        //   $each: {
        //     value: {
        //       required,
        //       minLen: minLength(5)
        //     }
        //   }
        // }
      }
    }
  },
  async created () {
    const result = await callApiSettingCommissionGetListFundDistributor(this)
    this.fundDistributors = result.response
  },
  methods: {
    addNewRow () {
      this.lines.push({
        min_amount: '',
        sell_commission: '',
        maintance_commission_amount: ''
      })
    },
    async onSubmit (params) {
      params.lines = this.lines
      const result = await callApiSettingCommissionCreate(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Add New Success'),
          message: this.$t('common.Add New Success')
        })
        this.$router.push('/setting-commission')
      } else {
        this.error = result.message
      }
    }
    // onAddHobby () {
    //   const newHobby = {
    //     id: Math.random() * Math.random() * 1000,
    //     value: ''
    //   }
    //   this.hobbyInputs.push(newHobby)
    // },
    // onDeleteHobby (id) {
    //   this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
    // }
  }
}
</script>
<style>
.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}
</style>
