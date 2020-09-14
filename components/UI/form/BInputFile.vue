<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <input
      :id="name"
      :ref="name"
      :class="classCss"
      type="file"
      :name="name"
      :aria-invalid="vuelidate[name].$error"
      :disabled="disabled"
      :placeholder="placeholder"
      :accept="accept"
      :style="css"
      @change="changeValue"
    />
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <input
      :id="name"
      :ref="name"
      :class="classCss"
      type="file"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :accept="accept"
      :style="css"
      @change="changeValue"
    />
  </div>
</template>
<script>
export default {
  props: {
      name: {
        type: String,
        required: true
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
      accept: {
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
    data.form[this.name] = ''
    return data
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, '')
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
    },
    changeValue () {
      this.setValue(this.$refs[this.name].files[0])
    }
  }
}
</script>
