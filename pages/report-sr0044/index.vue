<template>
  <div class="row">
    <div class="col-md-12">
      <button class="btn btn-warning" @click="showModalUpload">Import SR0044</button>
      <modal-upload
        ref="modal"
        header="Import file excel"
        file-title="File excel"
        file-accept=".xls, .xlsx, .csv"
        button-title="Import Transaction"
        validate-require-message="File excel is required"
        @onUpload="importFileExcel"
      />
    </div>
  </div>
</template>
<script>
import ModalUpload from '@/components/UI/modal/ModalUpload'
import { callApiTransactionFundImportFileExcel } from '@/apis/transaction_fund'
export default {
  components: {
    ModalUpload
  },
  data () {
    return {}
  },
  methods: {
    showModalUpload () {
      this.$refs.modal.show()
    },
    async importFileExcel (params) {
      const result = await callApiTransactionFundImportFileExcel(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Upload Success'),
          message: this.$t('common.Upload Success')
        })
        this.$refs.modal.uploading = false
        this.$refs.modal.hide()
        this.$router.push(this.localePath('/report-sr0044/import/' + result.response.file_import_id))
      } else {
        this.flashMessage.error({
          title: this.$t('common.Upload Error'),
          message: result.message
        })
        this.$refs.modal.uploading = false
      }
    }
  }
}
</script>
