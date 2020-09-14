<template>
  <div class="equipments-page">
    <Navbar :page-title="$t('test.test management')" />
    <div class="content">
      <div class="container-fluid">
        <client-only>
          <v-server-table
            ref="table"
            :url="searchStation ? `${searchStation.id}` : ''"
            class="table-equipments"
            :columns="columns"
            :options="options"
          >
            <div slot="headRight">
              <nuxt-link class="btn btn-primary" to="/test/add">{{ $t('test.add test') }}</nuxt-link>
            </div>
            <div slot="action" slot-scope="props">
              <nuxt-link
                class="btn btn-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('test.edit')"
                :to="`/test/${props.row.id}`"
              >
                <i class="fa fa-edit"></i>
              </nuxt-link>
              <nuxt-link
                class="btn btn-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                :to="`/test/${props.row.id}`"
              >
                <i class="fa fa-remove"></i>
              </nuxt-link>
            </div>
          </v-server-table>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    searchStation: null,
    loadingExcel: false,
    columns: [
      'index',
      'name',
      'email',
      'age',
      'address',
      'action'
    ]
  }),
  computed: {
    ...mapState('tests', ['listTests']),
    options () {
      return {
        searchStation: this.searchStation,
        headings: {
          index: this.$t('test.index'),
          name: this.$t('test.name'),
          email: this.$t('test.email'),
          age: this.$t('test.age'),
          address: this.$t('test.address'),
          edit: this.$t('common.action')
        },
        sortable: [
          'name',
          'email',
          'age',
          'address'
        ],
        requestFunction (data) {
          return this.$store.dispatch('tests/getListTests', data)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.equipments-page {
  .table-equipments {
    table {
      tr td:nth-child(1) {
        width: 70px;
      }
      tr td:last-child {
        width: 120px;
        text-align: center;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
  }
}
</style>
