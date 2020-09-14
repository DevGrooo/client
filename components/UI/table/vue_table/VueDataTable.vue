<template>
  <div slot-scope="props" :class="`VueTables VueTables--${props.source}`">
    <div class="card bootstrap-table">
      <div class="card-body table-full-width">
        <div class="bootstrap-table">
          <div :class="props.theme.row">
            <div :class="props.theme.column">
              <div
                v-if="!props.opts.filterByColumn && props.opts.filterable"
                :class="`${props.theme.field} ${props.theme.inline} ${props.theme.left} VueTables__search`"
              >
                <vnodes :vnodes="props.slots.beforeFilter" />
                <vt-generic-filter />
                <vnodes :vnodes="props.slots.afterFilter" />
              </div>
              <vnodes :vnodes="props.slots.afterFilterWrapper" />

              <div
                v-if="props.perPageValues.length > 1"
                :class="`${props.theme.field} ${props.theme.inline} ${props.theme.right} VueTables__limit`"
              >
                <vnodes :vnodes="props.slots.beforeLimit" />
                <vt-per-page-selector />
                <vnodes :vnodes="props.slots.afterLimit" />
              </div>

              <div
                :class="`${props.theme.field} ${props.theme.inline} ${props.theme.right} VueTables__slot_head_right`"
              >
                <vnodes :vnodes="props.slots.headRight" />
              </div>

              <div
                v-if="props.opts.pagination.dropdown && props.totalPages > 1"
                class="VueTables__pagination-wrapper"
              >
                <div
                  :class="`${props.theme.field} ${props.theme.inline} ${props.theme.right} VueTables__dropdown-pagination`"
                >
                  <vt-dropdown-pagination />
                </div>
              </div>

              <div
                v-if="props.opts.columnsDropdown"
                :class="`VueTables__columns-dropdown-wrapper ${props.theme.right} ${props.theme.dropdown.container}`"
              >
                <vt-columns-dropdown />
              </div>
            </div>
          </div>

          <vnodes :vnodes="props.slots.beforeTable" />
          <div class="table-responsive">
            <vt-table ref="vt_table" />
          </div>
          <vnodes :vnodes="props.slots.afterTable" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VtColumnsDropdown from 'vue-tables-2/compiled/components/VtColumnsDropdown'
import VtDropdownPagination from 'vue-tables-2/compiled/components/VtDropdownPagination'
import VtGenericFilter from 'vue-tables-2/compiled/components/VtGenericFilter'
import VtPerPageSelector from 'vue-tables-2/compiled/components/VtPerPageSelector'
import VtTable from 'vue-tables-2/compiled/components/VtTable'

export default {
  name: 'VueDataTable',
  components: {
    VtGenericFilter,
    VtPerPageSelector,
    VtColumnsDropdown,
    VtDropdownPagination,
    VtTable,
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
<style>
.VueTables__filters-row, .VuePagination__count {
  display: none;
}
.bootstrap-table .table-responsive {
  margin-top: 30px;
}
.bootstrap-table .pull-right .btn {
  margin-left: 15px;
}
.bootstrap-table .fixed-table-pagination {
  margin: 0px;
  padding: 15px 0px 0px 0px;
}
.bootstrap-table table th {
  text-align: center;
}
.bootstrap-table table tr td:last-child {
  text-align: center;
}
</style>
