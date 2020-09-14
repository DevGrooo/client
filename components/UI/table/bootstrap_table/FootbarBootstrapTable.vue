<template>
  <div class="fixed-table-pagination">
    <div class="pull-left pagination-detail">
      <span class="pagination-info"></span>
      <span class="page-list">
        <span class="btn-group dropup">
          <button type="button" class="btn btn-outline dropdown-toggle" data-toggle="dropdown">
            <span class="page-size">{{ perPageActive }}</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li v-for="(page, index) in listPage" :key="index" :class="{'active': (page === perPageActive)}">
              <a href="#" @click.prevent="onChangePerPage(page)">{{ page }}</a>
            </li>
          </ul>
        </span> rows visible
      </span>
    </div>
    <PaginationBootstrapTable :number-page="numberPage" :current-page="currentPage" @onSelectCurrentPage="onSelectCurrentPage" />
  </div>
</template>
<script>
import PaginationBootstrapTable from '@/components/UI/table/bootstrap_table/PaginationBootstrapTable'

export default {
  components: {
    PaginationBootstrapTable
  },
  props: {
      numberPage: {
          type: Number,
          required: false,
          default: 0
      },
      currentPage: {
          type: Number,
          required: false,
          default: 0
      },
      pages: {
          type: Array,
          required: false,
          default () {
              return [10, 20, 50, 100]
          }
      },
      perPage: {
          type: Number,
          required: false,
          default: 10
      }
  },
  data () {
      return {
          perPageActive: parseInt(this.perPage)
      }
  },
  computed: {
      listPage () {
        if (this.pages.includes(parseInt(this.perPage))) {
          return this.pages
        } else {
          const result = this.pages.concat(parseInt(this.perPage))
          result.sort((a, b) => a - b)
          return result
        }
      }
  },
  methods: {
      onChangePerPage (page) {
        this.perPageActive = page
        this.$emit('onChangePerPage', page)
      },
      onSelectCurrentPage (page) {
        this.$emit('onSelectCurrentPage', page)
      }
  }
}
</script>
