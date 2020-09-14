<template>
  <div class="progress">
    <div
      :class="props.class"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="'width: '+value+'%;'"
    >
      <span class="sr-only">{{ value }}% Complete</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    },
    props: {
      type: Object,
      required: false,
      default () {
        return {
          class: 'progress-bar progress-bar-info'
        }
      }
    }
  }
}
</script>
