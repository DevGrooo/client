<template>
  <div class="item-side-bar">
    <a data-toggle="collapse" class="nav-link" href="#" :aria-expanded="show" @click.prevent="handleRedirect(path)">
      <i v-if="imageSrc === ''" :class="icon" />
      <img v-else :src="imageSrc" />
      <p>
        <slot></slot>
        <b v-if="items.length > 0" class="caret"></b>
      </p>
    </a>
    <div v-if="items.length > 0" :class="{ 'collapse': true, 'show': show }">
      <ul class="nav">
        <li v-for="(item, index) in items" :key="index" :class="{'nav-item': true, 'active': item.active }">
          <sub-item-sidebar :index="index" :path="item.path" :icon="item.icon" @setSubItemActive="setSubItemActive">{{ item.name }}</sub-item-sidebar>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SubItemSidebar from '@/components/UI/bar/SubItemSidebar'
export default {
  components: {
    SubItemSidebar
  },
  props: {
    index: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: false,
        default: ''
    },
    icon: {
        type: String,
        required: false,
        default: 'nc-icon nc-app'
    },
    imageSrc: {
        type: String,
        required: false,
        default: ''
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      show: this.active
    }
  },
  computed: {
    items () {
      return this.getItems(this.$store.state.user.menus[this.index].subItems)
    }
  },
  methods: {
    handleRedirect (path) {
      this.show = !this.show
      if (path !== '') {
          this.setSubItemActive(-1)
          this.$router.push(this.localePath(path))
      }
    },
    getItems (items) {
      for (let i = 0; i < items.length; i++) {
        items[i].icon = 'nc-icon nc-simple-delete'
      }
      return items
    },
    setSubItemActive (subItemIndex) {
      this.$store.commit('user/SET_MENU_ITEM_ACTIVE', { itemIndex: this.index, subItemIndex })
      this.$emit('setItemActive', this.index)
    },
    removeActive () {
      this.show = false
    }
  }
}
</script>
