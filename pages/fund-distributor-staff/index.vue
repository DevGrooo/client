<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/fund-distributor-staff/create" to="/fund-distributor-staff/create">
            {{ $t('fundDistributorStaff.Create Fund Distributor Staff') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-2">
              <input v-model="filters.fullname" :placeholder="$t('fundDistributorStaff.Staff Name')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <input v-model="filters.phone" :placeholder="$t('fundDistributorStaff.Phone')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.fund_distributor_id" :placeholder="$t('fundDistributorStaff.Fund Distributor')" class="form-control">
                <option value="">{{ $t('fundDistributorStaff.All Fund Distributor') }}</option>
                <option v-for="(item, index) in fund_distributors" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.status.value" :placeholder="$t('fundDistributorStaff.Status')" class="form-control">
                <option value="">{{ $t('fundDistributorStaff.All Status') }}</option>
                <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ $t('common.Status.Active') }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ $t('common.Status.Lock') }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/fund-distributor-staff/update"
          :to="`/fund-distributor-staff/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('fundDistributorStaff.Confirm Lock Saleman') }"
          role="/fund-distributor-staff/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('fundDistributorStaff.Confirm Unlock Saleman') }"
          role="/fund-distributor-staff/active"
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
import {
  callApiFundDistributorStaffList,
  callApiFundDistributorStaffLock,
  callApiFundDistributorStaffActive,
  callApiFundDistributorStaffGetStatus
} from '@/apis/fund_distributor_staff'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
        fullname: '',
        phone: '',
        status: {
          compare: '=',
          value: ''
        },
        fund_distributor_id: ''
      },
      fund_distributors: [],
      status: [],
      columns: [
          'id',
          'fund_company.name',
          'fund_distributor.name',
          'name',
          'certificate_number',
          'phone',
          'email',
          'status',
          'action'],
      options: {
        headings: {
          id: this.$t('fundDistributorStaff.Id'),
          'fund_company.name': this.$t('fundDistributorStaff.Company Name'),
          'fund_distributor.name': this.$t('fundDistributorStaff.Distributor Name'),
          name: this.$t('fundDistributorStaff.Staff Name'),
          certificate_number: this.$t('fundDistributorStaff.Certificate Number'),
          phone: this.$t('fundDistributorStaff.Phone'),
          emai: this.$t('fundDistributorStaff.Email'),
          status: this.$t('fundDistributorStaff.Status'),
          action: this.$t('common.action')
        },
        sortable: [],
        filterByColumn: true,
        requestFunction (data) {
          return callApiFundDistributorStaffList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  async created () {
    this.fund_distributors = await callApiFundDistributorGetList(this)
    this.status = await callApiFundDistributorStaffGetStatus(this)
  },
  methods: {
    async lock (id) {
      const result = await callApiFundDistributorStaffLock(this, { fund_distributor_staff_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorStaff.Lock Success'),
          message: this.$t('fundDistributorStaff.Lock Success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorStaff.Lock Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiFundDistributorStaffActive(this, { fund_distributor_staff_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorStaff.Active Success'),
          message: this.$t('fundDistributorStaff.Active Success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorStaff.Active Error'),
          message: result.message
        })
      }
    },
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    }
  }
}
</script>
