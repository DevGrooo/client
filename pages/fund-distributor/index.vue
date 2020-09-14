<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/fund-distributor/create" to="/fund-distributor/create">{{ $t('fundDistributor.Create Fund Distributor') }}</role-button>
        </div>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ $t('common.Status.Active') }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ $t('common.Status.Lock') }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/fund-distributor/update"
          :to="`/fund-distributor/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: 'Bạn muốn khóa đại lý phân phối này?'}"
          role="/fund-distributor/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: 'Bạn muốn mở khóa đại lý phân phối này?'}"
          role="/fund-distributor/active"
          @onClick="active(props.row.id)"
        >
          <i class="fa fa-unlock"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import { callApiFundDistributorList, callApiFundDistributorLock, callApiFundDistributorActive } from '@/apis/fund_distributor'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      columns: ['id', 'fund_company.name', 'name', 'code', 'phone', 'status', 'action'],
      options: {
        headings: {
          id: this.$t('fundDistributor.Id'),
          'fund_company.name': this.$t('fundDistributor.Company'),
          name: this.$t('fundDistributor.Name'),
          code: this.$t('fundDistributor.Code'),
          phone: this.$t('fundDistributor.Phone'),
          status: this.$t('fundDistributor.Status'),
          action: this.$t('common.action')
        },
        filterByColumn: true,
        sortable: [
          'name',
          'code'
        ],
        requestFunction (data) {
          return callApiFundDistributorList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  methods: {
    async lock (id) {
      const result = await callApiFundDistributorLock(this, { fund_distributor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributor.Lock Success'),
          message: this.$t('fundDistributor.Lock Success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributor.Lock Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiFundDistributorActive(this, { fund_distributor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributor.Active Success'),
          message: this.$t('fundDistributor.Active Success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributor.Active Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
