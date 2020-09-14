import Vue from 'vue'
import { ServerTable } from 'vue-tables-2'
import VueDataTable from '@/components/UI/table/vue_table/VueDataTable'
import VueTable from '@/components/UI/table/vue_table/VueTable'
import VuePagination from '@/components/UI/table/vue_table/VuePagination'

// Docs: https://matanya.gitbook.io/vue-tables-2
Vue.use(
  ServerTable,
  {
    sortIcon: {
      base: 'fa fas',
      is: 'fa-sort',
      up: 'fa-sort-alpha-asc',
      down: 'fa-sort-alpha-desc'
    },
    perPage: 10
  },
  false,
  'bootstrap4',
  {
    dataTable: VueDataTable,
    table: VueTable,
    pagination: VuePagination
    // genericFilter: VtGenericFilter,
    // perPageSelector: VtPerPageSelector
  }
)
