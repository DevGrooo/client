<template>
  <div class="fixed-table-container">
    <div class="fixed-table-body">
      <table class="table table-hover">
        <caption v-if="props.caption">{{ props.caption }}</caption>
        <vt-table-head />
        <vnodes :vnodes="props.slots.beforeBody" />
        <vt-table-body />
        <vnodes :vnodes="props.slots.afterBody" />
      </table>
      <div class="fixed-table-pagination">
        <vt-pagination />
      </div>
    </div>
  </div>
</template>

<script>
import VtTableHead from 'vue-tables-2/compiled/components/VtTableHead'
import VtTableBody from 'vue-tables-2/compiled/components/VtTableBody'
import VtPagination from 'vue-tables-2/compiled/components/VtPagination'

export default {
  name: 'VueTable',
  components: {
    VtTableHead,
    VtTableBody,
    VtPagination,
    vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
      props: {
          type: Object,
          required: false,
          default () {
              return {}
          }
      }
  }
}
</script>
