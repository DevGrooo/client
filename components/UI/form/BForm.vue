<template>
  <form :class="classCss" :style="css" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>
<script>
import _ from 'lodash'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  props: {
    classCss: {
      type: String,
      required: false,
      default: 'form-horizontal'
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
    },
    data: {
      type: Object,
      required: false,
      default () {
          return {}
      }
    }
  },
  data () {
    return this.getData()
  },
  created () {
    this.$v.form.messages = this.getValidateMessages()
  },
  validations () {
    return this.getValidations()
  },
  methods: {
    initDataValue (name, value) {
      if (typeof this.form[name] === 'undefined') {
        this.form[name] = this._getFormData(name)
      }
      if (!_.isEmpty(value) || typeof value === 'number') {
        this.form[name] = value
      }
    },
    formValidate () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return false
      }
      return true
    },
    getValidations () {
      const validations = { form: {} }
      for (const key in this.validates) {
        validations.form[key] = this.validates[key].rules
      }
      return validations
    },
    getValidateMessages () {
      const messages = {}
      for (const key in this.validates) {
        messages[key] = this.validates[key].messages
      }
      return messages
    },
    getData () {
      const form = {}
      for (const key in this.validates) {
        form[key] = this._getFormData(key)
      }
      return { form }
    },
    _getFormData (key) {
      if (typeof this.data[key] !== 'undefined' && this.data[key] !== null) {
        return this.data[key]
      }
      return ''
    },
    onSubmit () {
      if (this.formValidate()) {
        this.$emit('onSubmit', this.form)
      }
    }
  }
}
</script>
