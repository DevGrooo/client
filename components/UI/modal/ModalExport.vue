<template>
  <modal ref="modal" :props="props">
    <template slot="header">{{ header }}</template>
    <div slot="body">
      <progress-bar v-if="processing !== false" :value="processPercent" />
      <div v-else>
        {{ button }}: <a :href="fileData" :download="fileName" @click="hide">{{ fileName }}</a>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from '@/components/UI/modal/Modal'
import ProgressBar from '@/components/UI/bar/ProgressBar'
export default {
  components: {
    Modal,
    ProgressBar
  },
   props: {
    props: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    header: {
      type: String,
      required: false,
      default: 'Export'
    },
    button: {
      type: String,
      required: false,
      default: 'Download'
    }
  },
  data () {
    return {
      processing: false,
      processPercent: 0,
      fileName: '',
      fileData: null
    }
  },
  methods: {
    setData (fileData, fileName) {
      this.fileData = fileData
      this.fileName = fileName
      clearInterval(this.processing)
      this.processing = false
    },
    show () {
      this.processPercent = 0
      this.$refs.modal.show()
      this.processing = setInterval(() => {
        this.processPercent = this.processPercent > 100 ? 100 : this.processPercent + 1
      }, 100)
    },
    hide () {
      clearInterval(this.processing)
      this.processing = false
      this.$refs.modal.hide()
      this.$$emit('downloaded')
    }
  }
}
</script>
