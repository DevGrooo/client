<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <label class="col-form-label col-md-2">{{ $t('mail_template.mail template') }}</label>
      <div class="col-md-8">
        <multiselect
          v-model="value"
          track-by="mail_template_id"
          label="name"
          :options="options"
          :close-on-select="true"
          :placeholder="$t('mail_template.select one')"
          @input="handleChange($event)"
        ></multiselect>
      </div>
    </div>
    <div>&nbsp;</div>
    <div class="row">
      <label class="col-form-label col-md-2">{{ $t('mail_template.subject') }}</label>
      <div class="col-md-8">
        <input v-model="subject" type="text" />
      </div>
    </div>
    <div>&nbsp;</div>
    <no-ssr placeholder="Loading Your Editor...">
      <vue-editor v-model="content" :placeholder="$t('mail_template.write something')"></vue-editor>
      <button @click="saveContent">{{ $t('mail_template.save content') }}</button>
    </no-ssr>
    <div>&nbsp;</div>
    <div class="row">
      <ul>
        <li v-for="(value, key, index) in keys" :key="index">{{ key }} - {{ value }}</li>
      </ul>
    </div>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import { callApiMailTemplateGetGetList } from '@/apis/mail_template'
import { callApiMailTemplateLocaleUpdate, callApiMailTemplateLocaleDetail } from '@/apis/mail_template_locale'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  asyncData () {
    return {
      value: null,
      keys: null,
      subject: null,
      content: '',
      options: [],
      errors: []
    }
  },
  async created () {
    const result = await callApiMailTemplateGetGetList(this)
    const detail = await callApiMailTemplateLocaleDetail(this, { mail_template_locale_id: this.$route.params.id })
    this.options = result.response
    this.value = this.options.find((item) => {
      return item.mail_template_id === parseInt(this.$route.params.id)
    })
    this.content = detail.response.content
    this.subject = detail.response.subject
  },
  methods: {
    async saveContent () {
      let flag = true
      this.errors = []
      if (this.content.trim() === '') {
        flag = false
        this.errors.push(this.$t('mail_template.content is required'))
      }
      if (this.value === null) {
        flag = false
        this.errors.push(this.$t('mail_template.mail template is required'))
      }
      if (this.subject === null) {
        flag = false
        this.errors.push(this.$t('mail_template.subject is required'))
      }
      if (flag) {
        const params = {
          mail_template_locale_id: parseInt(this.$route.params.id),
          mail_template_id: this.value.mail_template_id,
          subject: this.subject,
          content: this.content
        }
        const result = await callApiMailTemplateLocaleUpdate(this, params)
        if (result.status) {
          this.flashMessage.success({
            title: this.$t('common.success'),
            message: this.$t('common.Update Success')
          })
        } else {
          this.flashMessage.error({
            title: this.$t('common.error'),
            message: result.message
          })
        }
      }
    },
    handleChange (e) {
      // const result = await callApiMailTemplateGetDetail(this, e.mail_template_id)
      // console.log('e', result)
      if (e) {
        const mailTemplate = this.options.find(function (item) {
          return item.mail_template_id === e.mail_template_id
        })
        this.keys = JSON.parse(mailTemplate.keys)
      } else {
        this.keys = null
      }
    }
  }
}
</script>

<style scoped>
</style>
