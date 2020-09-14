<template>
  <modal ref="modal" :props="props">
    <template slot="header">{{ header }}</template>
    <div slot="body">
      <b-form :validates="validates" @onSubmit="onSubmit">
        <slot name="form"></slot>
        <div class="row">
          <label class="col-md-3 col-form-label">{{ fileTitle }}</label>
          <div class="col-md-9">
            <b-input-file :name="fileName" :accept="fileAccept" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-9">
            <button :class="{'btn': true, 'btn-primary': !uploading, 'btn-warning': uploading }" type="submit">
              {{ !uploading ? buttonTitle : buttonTitleProcessing }}
            </button>
          </div>
        </div>
      </b-form>
    </div>
  </modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Modal from '@/components/UI/modal/Modal'
import BInputFile from '@/components/UI/form/BInputFile'
import BForm from '@/components/UI/form/BForm'
export default {
  components: {
    Modal,
    BInputFile,
    BForm
  },
   props: {
    props: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    fileName: {
      type: String,
      required: false,
      default: 'file'
    },
    fileTitle: {
      type: String,
      required: false,
      default: 'File upload'
    },
    fileAccept: {
      type: String,
      required: false,
      default: 'image/*'
    },
    header: {
      type: String,
      required: false,
      default: 'Upload File'
    },
    buttonTitle: {
      type: String,
      required: false,
      default: 'Upload'
    },
    buttonTitleProcessing: {
      type: String,
      required: false,
      default: 'Uploading'
    },
    validateRequireMessage: {
      type: String,
      required: false,
      default: 'File upload is required'
    }
  },
  data () {
    return {
      uploading: false,
      validates: this._getValidates()
    }
  },
  methods: {
    _getValidates () {
      const validates = {}
      validates[this.fileName] = {
        rules: { required },
        messages: {
          required: this.validateRequireMessage
        }
      }
      return validates
    },
    onSubmit (params) {
      if (!this.uploading) {
        this.uploading = true
        this.$emit('onUpload', params)
      }
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>
