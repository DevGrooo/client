<template>
  <a v-if="hasRole(role) && to === ''" :class="props.class" :title="title" href="#" @click.prevent="onClick">
    <slot></slot>
  </a>
  <a v-else-if="hasRole(role)" :class="props.class" :title="title" :href="to" @click.prevent="onClick">
    <slot></slot>
  </a>
  <span v-else></span>
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
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    role: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    hasRole (role) {
      if (this.$store.state.user.myProfile.user) {
        for (let i = 0; i < this.$store.state.user.myProfile.user.all_roles.length; i++) {
          if (this.$store.state.user.myProfile.user.all_roles[i].code === role) {
            this.title = this.$store.state.user.myProfile.user.all_roles[i].name
            return true
          }
        }
      }
      return false
    },
    onClick () {
      if (this.props.confirmText) {
        if (confirm(this.props.confirmText)) {
          if (this.to !== '') {
            this.$router.push(this.localePath(this.to))
          } else {
            this.$emit('onClick')
          }
        }
      } else if (this.to !== '') {
        this.$router.push(this.localePath(this.to))
      } else {
        this.$emit('onClick')
      }
    }
  }
}
</script>
