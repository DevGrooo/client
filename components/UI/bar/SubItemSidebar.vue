<template>
  <a class="nav-link" href="#" @click.prevent="setSubItemActive(index)">
    <span class="sidebar-mini"><i :class="icon" /></span>
    <span class="sidebar-normal"><slot></slot></span>
  </a>
</template>
<script>
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: false,
            default: 'nc-icon nc-stre-right'
        }
    },
    data () {
        return {}
    },
    methods: {
        setSubItemActive (index) {
            this.$emit('setSubItemActive', index)
            this.$router.push(this.localePath(this.path))
        }
    }
}
</script>
<style>
.item-side-bar .nav .nav-item .nav-link {
    text-transform: capitalize;
}
</style>
