<template>
  <div class="equipments-page">
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
              <nuxt-link class="btn btn-primary" to="/fund-certificate/add">{{ $t('fund_certificate.add fund certificate') }}</nuxt-link>
            </div>
            <div slot="status" slot-scope="props">
              <span v-if="props.row.status === 1">Đang hoạt động</span>
              <span v-if="props.row.status === 2">Đã khóa</span>
            </div>
            <div slot="action" slot-scope="props">
              <nuxt-link
                class="btn btn-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('fund_certificate.edit')"
                :to="`/fund-certificate/update/${props.row.id}`"
              >
                <i class="fa fa-edit"></i>
              </nuxt-link>
              <a
                v-if="props.row.status == 1"
                class="btn btn-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="Khóa chứng chỉ quỹ"
                @click.prevent="handleToggleLock(props.row.id, true)"
              >
                <i class="fa fa-lock"></i>
              </a>
              <a
                v-if="props.row.status == 2"
                class="btn btn-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="Mở khóa chứng chỉ quỹ"
                @click.prevent="handleToggleLock(props.row.id)"
              >
                <i class="fa fa-unlock"></i>
              </a>
            </div>
          </v-server-table>
        </client-only>
      </div>
      <FlashMessage></FlashMessage>
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
      'code',
      'status',
      'created_at',
      'updated_at',
      'action'
    ]
  }),
  computed: {
    ...mapState('fund_certificate', ['list']),
    options () {
      return {
        searchStation: this.searchStation,
        headings: {
          index: this.$t('fund_certificate.index'),
          name: this.$t('fund_certificate.name'),
          code: this.$t('fund_certificate.code'),
          status: this.$t('fund_certificate.status'),
          created_at: this.$t('fund_certificate.created_at'),
          updated_at: this.$t('fund_certificate.updated_at'),
          edit: this.$t('common.action')
        },
        sortable: ['name', 'code', 'status'],
        requestFunction (data) {
          return this.$store.dispatch(
            'fund_certificates/getListFundCertificates',
            data
          )
        }
      }
    }
  },
  methods: {
    handleToggleLock (id, flag = false) {
      const mess = flag ? 'mở' : ''
      if (confirm(`Bạn có muốn ${mess} khóa chứng chỉ quỹ này ?`)) {
        return this.$store.dispatch('fund_certificates/lockOrActiveFundCertificate', { id, flag })
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
