<template>
  <div class="tree-view">
    <item-tree-view :name="name" :childs="childs" :props="props" @onChildClick="onChildClick" />
  </div>
</template>
<script>
import ItemTreeView from '@/components/UI/form/ItemTreeView'
export default {
  components: {
    ItemTreeView
  },
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    childs: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      value: null,
      checked: this.props.checked
    }
  },
  methods: {
    onClick (checked, name) {
      if (checked) {
        this.value = this.props.value
      } else {
        this.value = null
      }
      this.checked = checked
      // this.$emit('onChildClick', name, this.value, checked)
    },
    onChildClick (name, value, checked) {
      if (checked === true) {
        if (this.checked === false) {
          this.onClick(true, this.name)
        }
      } else if (!this.hasChildChecked()) {
        if (this.checked === true) {
          this.onClick(false, this.name)
        }
      }
    },
    hasChildChecked () {
      return false
    }
  }
}
</script>
