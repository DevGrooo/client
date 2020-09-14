<template>
  <div v-if="!hidden" :class="classCss">
    <button
      type="button"
      aria-hidden="true"
      class="close"
      @click="hidden = true"
    >
      <i class="nc-icon nc-simple-remove"></i>
    </button>
    <slot></slot>
  </div>
  <span v-else class="hidden"></span>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: false,
      default: 'warning'
    }
  },
  data () {
    return {
      hidden: !this.show
    }
  },
  created () {
    this.classCss = 'alert alert-' + this.type
  },
  methods: {
    onHide () {
      this.hidden = true
    }
  }
}
</script>
