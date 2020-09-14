<template>
  <div v-if="vuelidate[name]" :class="{'form-group': true, 'has-error': vuelidate[name].$error}">
    <no-ssr>
      <vue-tags-input
        v-model="form[name]"
        :disabled="disabled"
        :placeholder="placeholder"
        :add-on-key="[13,',']"
        :tags="tags"
        :max-tags="maxTags"
        :avoid-adding-duplicates="true"
        :allow-edit-tags="true"
        :separators="[',']"
        @tags-changed="setValue"
      />
    </no-ssr>
    <template v-if="vuelidate[name].$error">
      <span v-for="(message, rule, index) in vuelidate.messages[name]" :key="index">
        <label v-if="!vuelidate[name][rule]" :id="name + '-error'" class="error" :for="name">{{ message }}</label>
      </span>
    </template>
  </div>
  <div v-else :class="{'form-group': true}">
    <no-ssr>
      <vue-tags-input
        v-model="form[name]"
        :disabled="disabled"
        :placeholder="placeholder"
        :add-on-key="[13,',']"
        :tags="tags"
        :max-tags="maxTags"
        :avoid-adding-duplicates="true"
        :allow-edit-tags="true"
        :separators="[',']"
        @tags-changed="setValue"
      />
    </no-ssr>
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
        type: Array,
        required: false,
        default () {
          return []
        }
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
      maxTags: {
        type: Number,
        required: false,
        default: 5
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
    const data = { form: {}, vuelidate: null, tags: [] }
    data.form[this.name] = ''
    data.tags = this._getTagsFromValue(this.value)
    return data
  },
  created () {
    this.vuelidate = this.$parent.$v.form
    this.$parent.initDataValue(this.name, this.value)
    if (this.value.length === 0) {
      this.tags = this._getTagsFromValue(this.$parent.form[this.name])
    }
  },
  methods: {
    _getTagsFromValue (value) {
      const tags = []
      for (let i = 0; i < value.length; i++) {
        tags.push({
          text: value[i],
          style: '',
          classes: ''
        })
      }
      return tags
    },
    _getValueFromTags (tags) {
      const value = []
      for (let i = 0; i < tags.length; i++) {
        value.push(tags[i].text)
      }
      return value
    },
    setValue (tags) {
      const value = this._getValueFromTags(tags)
      // this.form[this.name] = value
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
.form-group .vue-tags-input {
  max-width: 100%;
}
.vue-tags-input .ti-input {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  background-color: #ffffff;
  min-height: 40px;
}
.vue-tags-input .ti-new-tag-input-wrapper, .vue-tags-input .ti-tag {
  font-size: 0.875rem;
}
</style>
