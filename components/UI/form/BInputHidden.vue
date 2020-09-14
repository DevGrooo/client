<template>
  <input
    :id="name"
    v-model="form[name]"
    :class="classCss"
    type="hidden"
    :name="name"
    :style="css"
  />
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
    classCss: {
      type: String,
      required: false,
      default: ''
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
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.value)
    if (_.isEmpty(this.value) && typeof this.value !== 'number') {
      this.form[this.name] = this.$parent.form[this.name]
    }
  }
}
</script>
