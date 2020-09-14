<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <div class="form-check">
      <label class="form-check-label">
        <input
          :id="name"
          v-model="form[name]"
          :name="name"
          :class="classCss"
          :style="css"
          :aria-invalid="vuelidate[name].$error"
          type="checkbox"
          :true-value="trueValue"
          false-value=""
          :disabled="disabled"
          @click="onClick($event.target.checked, name)"
        >
        <span class="form-check-sign"></span>
        <slot></slot>
      </label>
    </div>
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <div class="form-check">
      <label class="form-check-label">
        <input
          :id="name"
          v-model="$data[name]"
          :name="name"
          :class="classCss"
          :style="css"
          type="checkbox"
          :true-value="trueValue"
          false-value=""
          :disabled="disabled"
          @click="onClick($event.target.checked, name)"
        >
        <span class="form-check-sign"></span>
        <slot></slot>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
      name: {
          type: String,
          required: true
      },
      value: {
          type: [String, Number],
          required: true
      },
      checked: {
          type: Boolean,
          required: false,
          default: false
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
    const data = { form: {}, vuelidate: null, trueValue: this.value }
    data.form[this.name] = this.checked ? this.value : ''
    return data
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.checked ? this.value : '')
    if (!this.checked) {
      this.form[this.name] = this.$parent.form[this.name]
    }
  },
  methods: {
    onClick (checked, name) {
      if (checked) {
        this.form[name] = this.trueValue
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
