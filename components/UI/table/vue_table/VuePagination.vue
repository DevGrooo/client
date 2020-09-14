<template>
  <pagination
    v-model="props.page"
    :options="props.optionsObj"
    :for="props.name"
    :vuex="props.vuex"
    :records="props.records"
    :per-page="props.perPage"
    @paginate="page => props.setPage(page)"
  />
</template>

<script>
import Pagination from 'vue-pagination-2'

export default {
  name: 'VuePagination',
  components: {
    Pagination
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
