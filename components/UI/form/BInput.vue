<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <date-picker
      v-if="type === 'date'"
      v-model="form[name]"
      format="DD/MM/YYYY"
      value-type="format"
      default-value=""
      :input-class="classCss"
      :disabled="disabled"
      @input="setValue"
    />
    <input
      v-else
      v-model="form[name]"
      :class="classCss"
      :type="type"
      :name="name"
      :aria-invalid="vuelidate[name].$error"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="css"
      @input="setValue($event.target.value)"
    />
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <date-picker
      v-if="type === 'date'"
      v-model="form[name]"
      format="DD/MM/YYYY"
      value-type="format"
      :input-class="classCss"
      :disabled="disabled"
      @input="setValue"
    />
    <input
      v-else
      v-model="form[name]"
      :class="classCss"
      :type="type"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="css"
      @input="setValue($event.target.value)"
    />
  </div>
</template>
<script>
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: {
    DatePicker
  },
  props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      value: {
        type: [String, Number],
        required: false,
        default: ''
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      classCss: {
        type: String,
        required: false,
        default: 'form-control'
      },
      css: {
        type: String,
        required: false,
        default: ''
      },
      validates: {
        type: Object,
        required: false,
        default () {
            return {}
        }
      }
  },
  data () {
    const data = { form: {}, vuelidate: null }
    data.form[this.name] = this.value === null ? '' : this.value
    return data
  },
  watch: {
    value (newValue, oldValue) {
      this.setValue(newValue)
    }
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.value)
    if (_.isEmpty(this.value) && typeof this.value !== 'number') {
      this.form[this.name] = this.$parent.form[this.name]
    }
  },
  methods: {
    setValue (value) {
      this.form[this.name] = value
      this.$parent.form[this.name] = value
      if (this.vuelidate[this.name]) {
        this.vuelidate[this.name].$touch()
        this.$emit('input', this.name, value, this.vuelidate.$error)
      } else {
        this.$emit('input', this.name, value, true)
      }
    }
  }
}
</script>
<style>
.form-group .mx-datepicker {
  width: 100%;
}
</style>
