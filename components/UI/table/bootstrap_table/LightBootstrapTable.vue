<template>
  <div class="card bootstrap-table">
    <div class="card-header">
      <h4 class="card-title">Danh sách người dùng</h4>
    </div>
    <div class="card-body table-full-width">
      <div class="bootstrap-table">
        <ToolbarBootstrapTable />
        <div class="fixed-table-container" style="padding-bottom: 0px;">
          <div class="fixed-table-body">
            <table id="bootstrap-table" class="table table-hover" style="margin-top: 0px;">
              <HeadBootstrapTable :headers="headers" :actions="actions" />
              <BodyBootstrapTable :headers="headers" :actions="actions" :rows="rows" />
            </table>
          </div>
          <FootbarBootstrapTable :per-page="perPage" :number-page="numberPage" :current-page="currentPage" @onChangePerPage="onChangePerPage" @onSelectCurrentPage="onSelectCurrentPage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FootbarBootstrapTable from '@/components/UI/table/bootstrap_table/FootbarBootstrapTable'
import ToolbarBootstrapTable from '@/components/UI/table/bootstrap_table/ToolbarBootstrapTable'
import HeadBootstrapTable from '@/components/UI/table/bootstrap_table/HeadBootstrapTable'
import BodyBootstrapTable from '@/components/UI/table/bootstrap_table/BodyBootstrapTable'

export default {
  components: {
    FootbarBootstrapTable,
    ToolbarBootstrapTable,
    HeadBootstrapTable,
    BodyBootstrapTable
  },
  props: {
    fields: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    actions: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    dataManager: {
      type: Function,
      required: false,
      default: null
    },
    dataLocal: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    perPage: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data () {
    return {
      data: [],
      rows: [],
      headers: [],
      maxRow: parseInt(this.perPage),
      numberPage: 0,
      currentPage: 1,
      isDataLocal: false
    }
  },
  watch: {
    data (newVal, oldVal) {
      this.refresh()
    }
  },
  mounted () {
    this.headers = this.getFields()
    this.setData()
  },
  methods: {
    refresh () {
      this.currentPage = 1
      this.setRows(1)
    },
    setRows (pageIndex) {
      const rows = []
      const first = this.maxRow * (pageIndex - 1)
      const last = (first + this.maxRow) > this.data.length - 1 ? this.data.length : (first + this.maxRow)
      let index = 0
      for (let i = first; i < last; i++) {
        rows[index++] = this.data[i]
      }
      this.rows = rows
    },
    setData () {
      let data = []
      if (this.dataManager !== null && typeof this.dataManager === 'function') {
        const result = this.dataManager(this.currentPage, this.maxRow, this.getSortOrders(), this.getFilters())
        data = result.data
        this.numberPage = result.numberPage
        this.isDataLocal = false
      } else {
        data = this.getDataLocal()
        this.numberPage = Math.ceil(data.length / this.maxRow)
        this.isDataLocal = true
      }
      this.data = data
    },
    getDataLocal () {
      let data = []
      data = this.dataLocal
      const sortOrders = this.getSortOrders()
      const filters = this.getFilters()
      if (sortOrders.length > 0) {}
      if (filters.length > 0) {}
      return data
    },
    getFields () {
      const result = []
      if (this.fields) {
        for (let i = 0; i < this.fields.length; i++) {
          if (typeof this.fields[i] === 'object') {
            const tempField = {
              formatter: null,
              sortable: false,
              sortDesc: false,
              sortAsc: false
            }
            result[i] = Object.assign(tempField, this.fields[i])
            result[i].sortable = (typeof this.fields[i].sortField !== 'undefined')
          } else if (typeof this.fields[i] === 'string') {
            result[i] = {
              name: this.fields[i],
              title: this.fields[i],
              formatter: null,
              sortable: false,
              sortDesc: false,
              sortAsc: false
            }
          }
        }
      }
      return result
    },
    getSortOrders () {
      return []
    },
    getFilters () {
      return []
    },
    onChangePerPage (page) {
      this.maxRow = page
      this.setData()
      if (this.isDataLocal) {
        this.refresh()
      }
    },
    onSelectCurrentPage (currentPage) {
      this.currentPage = currentPage
      this.setRows(currentPage)
    },
    onActionClicked (action, data) {
      console.log('slot actions: on-click', data.name)
    }
  }
}
</script>
