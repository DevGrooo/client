<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <textarea
      :id="name"
      v-model="slotValue"
      :class="classCss"
      :name="name"
      :aria-invalid="vuelidate[name].$error"
      :style="css"
      :disabled="disabled"
      @input="setValue($event.target.value, name)"
    ></textarea>
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <textarea
      :id="name"
      v-model="slotValue"
      :class="classCss"
      :name="name"
      :style="css"
      :disabled="disabled"
      :cols="cols"
      :rows="rows"
      @input="setValue($event.target.value, name)"
    ></textarea>
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
      },
      cols: {
          type: Number,
          required: false,
          default: 10
      },
      rows: {
          type: Number,
          required: false,
          default: 30
      }
  },
  data () {
    const data = {
        slotValue: this.getSlotValue(),
        form: {},
        vuelidate: null
    }
    data.form[this.name] = this.value
    return data
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.value)
    if (_.isEmpty(this.value) && typeof this.value !== 'number') {
      this.slotValue = this.$parent.form[this.name]
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
    },
    getSlotValue () {
        if (this.$slots.default && this.$slots.default.length) {
            return this.$slots.default[0].text
        }
        return this.value
    }
  }
}
</script>
