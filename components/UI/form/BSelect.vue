<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <select
      :id="name"
      :class="classCss"
      :name="name"
      :aria-invalid="vuelidate[name].$error"
      :v-model="form[name]"
      :disabled="disabled"
      :style="css"
      @input="setValue($event.target.value, name)"
    >
      <slot></slot>
      <option v-for="(option, index) in options" :key="index" :value="option.value" :selected="option.value === form[name]">{{ option.title }}</option>
    </select>
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <select
      :id="name"
      :class="classCss"
      :name="name"
      :value="$data[name]"
      :disabled="disabled"
      :style="css"
      @input="setValue($event.target.value, name)"
    >
      <slot></slot>
      <option v-for="(option, index) in options" :key="index" :value="option.value" :selected="option.value === $data[name]">{{ option.title }}</option>
    </select>
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
    setValue (value, name) {
      this.form[name] = value
      this.$parent.form[name] = value
      if (this.vuelidate[name]) {
        this.vuelidate[name].$touch()
        this.$emit('input', name, value, this.vuelidate.$error)
      } else {
        this.$emit('input', name, value, true)
      }
    }
  }
}
</script>
