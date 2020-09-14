<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/fund-distributor-location/create" to="/fund-distributor-location/create">
          {{ $t('fundDistributorLocation.Create Fund Distributor Location') }}
        </role-button>
      </div>
      <div slot="status" slot-scope="props">
        <span v-if="props.row.status === 1" class="text-success">Đang hoạt động</span>
        <span v-if="props.row.status === 2" class="text-danger">Đã khóa</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/fund-distributor-location/update"
          :to="`/fund-distributor-location/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: 'Bạn muốn khóa chi nhánh đại lý phân phối này?'}"
          role="/fund-distributor-location/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: 'Bạn muốn mở khóa chi nhánh đại lý phân phối này?'}"
          role="/fund-distributor-location/active"
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
import { callApiFundDistributorLocationList, callApiFundDistributorLocationLock, callApiFundDistributorLocationActive } from '@/apis/fund_distributor_location'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      columns: [
          'id',
          'fund_company.name',
          'fund_distributor.name',
          'name',
          'phone',
          'fax',
          'status',
          'action'],
      options: {
        headings: {
          id: this.$t('fundDistributorLocation.Id'),
          'fund_company.name': this.$t('fundDistributorLocation.Company Name'),
          'fund_distributor.name': this.$t('fundDistributorLocation.Distributor Name'),
          name: this.$t('fundDistributorLocation.Location Name'),
          phone: this.$t('fundDistributorLocation.Phone'),
          fax: this.$t('fundDistributorLocation.Fax'),
          status: this.$t('fundDistributorLocation.Status'),
          action: this.$t('common.action')
        },
        sortable: [],
        requestFunction (data) {
          return callApiFundDistributorLocationList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  methods: {
    async lock (id) {
      const result = await callApiFundDistributorLocationLock(this, { fund_distributor_location_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorLocation.Lock Success'),
          message: this.$t('fundDistributorLocation.Lock fund distributor location success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorLocation.Lock Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiFundDistributorLocationActive(this, { fund_distributor_location_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorLocation.Active Success'),
          message: this.$t('fundDistributorLocation.Active fund distributor location success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorLocation.Active Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
