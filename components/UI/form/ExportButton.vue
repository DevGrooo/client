<template>
  <span>
    <button v-if="role === ''" :class="props.class" @click.prevent="onClick">
      <slot></slot>
    </button>
    <role-button v-else :role="role" :props="props" @onClick="onClick">
      <slot></slot>
    </role-button>
    <modal-export ref="modal" :props="modalProps" :header="modalHeader" :button="modalButton" />
  </span>
</template>
<script>
import ModalExport from '@/components/UI/modal/ModalExport'
import RoleButton from '@/components/UI/form/RoleButton'
export default {
  components: {
    ModalExport,
    RoleButton
  },
  props: {
    props: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    modalHeader: {
      type: String,
      required: false,
      default: 'Export'
    },
    modalButton: {
      type: String,
      required: false,
      default: 'Download'
    },
    modalProps: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    role: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.$emit('onClick')
        this.$refs.modal.show()
      }
    },
    setData (fileData, fileName) {
      this.$refs.modal.setData(fileData, fileName)
    },
    hideModal () {
      this.$refs.modal.hide()
    }
  }
}
</script>
