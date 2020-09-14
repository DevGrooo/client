<template>
  <div
    v-if="display"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style="display:block;"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"></slot>
          </h5>
          <button v-if="props.buttonClose !== false" type="button" class="close" aria-label="Close" @click="hide">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    props: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      display: typeof this.props.display !== 'undefined' ? this.props.display : false
    }
  },
  methods: {
    hide () {
      this.display = false
    },
    show () {
      this.display = true
    }
  }
}
</script>
