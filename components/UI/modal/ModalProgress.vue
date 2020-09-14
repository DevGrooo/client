<template>
  <modal ref="modal" :props="props">
    <template slot="header">{{ header }}</template>
    <div slot="body">
      <progress-bar v-if="processing !== false" :value="processPercent" />
      <div class="text-center text-primary">{{ processed }}/{{ total }}</div>
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
        return {
          buttonClose: false
        }
      }
    },
    header: {
      type: String,
      required: false,
      default: 'Processing'
    }
  },
  data () {
    return {
      processing: false,
      processPercent: 0,
      processed: 0,
      total: 0
    }
  },
  methods: {
    setData (processed, total) {
      this.processed = processed
      this.total = total
      this.processPercent = Math.round(processed / total * 100)
      this.processing = (processed !== total)
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.processPercent = 0
      this.processing = false
      this.$refs.modal.hide()
    }
  }
}
</script>
