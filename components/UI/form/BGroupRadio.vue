<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'form-group-radio': true, 'has-error': vuelidate[name].$error}">
    <div v-for="(option, index) in options" :key="index" class="form-check form-check-radio checkbox-inline">
      <label class="form-check-label">
        <input
          :id="name"
          v-model="form[name]"
          :name="name"
          :class="classCss"
          :style="css"
          :aria-invalid="vuelidate[name].$error"
          type="radio"
          :value="option.value"
          :disabled="disabled"
          @click="onClick($event.target.checked, name, option.value)"
        >
        <span class="form-check-sign"></span>
        {{ option.title }}
      </label>
    </div>
    <div class="clear-fix"></div>
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule) in vuelidate.messages[name]" :key="rule">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true, 'form-group-radio': true}">
    <div v-for="(option, index) in options" :key="index" class="form-check form-check-radio checkbox-inline">
      <label class="form-check-label">
        <input
          :id="name"
          v-model="$data[name]"
          :name="name"
          :class="classCss"
          :style="css"
          type="radio"
          :value="option.value"
          :disabled="disabled"
          @click="onClick($event.target.checked, name, option.value)"
        >
        <span class="form-check-sign"></span>
        {{ option.title }}
      </label>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
      name: {
          type: String,
          required: true
      },
      value: {
          type: [String, Number],
          required: false,
          default: ''
      },
      options: {
          type: Array,
          required: true
      },
      disabled: {
          type: Boolean,
          required: false,
          default: false
      },
      classCss: {
          type: String,
          required: false,
          default: 'form-check-input'
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
    data.form[this.name] = this.value
    return data
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.value)
    if (_.isEmpty(this.value) && typeof this.value !== 'number') {
      this.form[this.name] = this.$parent.form[this.name]
    }
  },
  methods: {
    onClick (checked, name, value) {
      if (checked) {
        this.form[name] = value
      } else {
        this.form[name] = ''
      }
      this.$parent.form[name] = this.form[name]
      if (this.vuelidate[name]) {
        this.vuelidate[name].$touch()
        this.$emit('input', name, this.form[name], this.vuelidate.$error)
      } else {
        this.$emit('input', name, this.form[name], true)
      }
    }
  }
}
</script>
<style>
.form-group-radio .form-check:first-child {
  margin-left: -10px;
}
</style>
