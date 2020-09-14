<template>
  <li :ref="'treeItems[' + name + ']'">
    <div :class="{'form-group': true}">
      <div class="form-check">
        <label class="form-check-label">
          <input
            v-model="value"
            class="form-check-input"
            type="checkbox"
            :true-value="props.value"
            false-value
            @click="onClick($event.target.checked, name)"
          />
          <span class="form-check-sign"></span>
          <slot></slot>
        </label>
      </div>
    </div>
    <ul v-if="Object.keys(childs).length > 0">
      <item-tree-view
        v-for="(child, index) in childs"
        :key="index"
        :name="child.name"
        :props="child.props"
        :childs="child.childs"
        @onChildClick="onChildClick"
      />
    </ul>
  </li>
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
  created () {
    this.value = this.props.checked === true ? this.props.value : null
  },
  methods: {
    onClick (checked, name) {
      if (checked) {
        this.value = this.props.value
      } else {
        this.value = null
      }
      this.checked = checked
      this.$emit('onChildClick', name, this.value, checked)
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
