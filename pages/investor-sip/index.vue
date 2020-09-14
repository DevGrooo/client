<template>
  <div>
    <v-server-table ref="vuetable" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/investor-sip/create" to="/investor-sip/create">
            {{ $t('investor_sip.Add') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.fund_code" :placeholder="$t('investor_sip.fund')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.distribution_agents" :placeholder="$t('investor_sip.Fund Distributor')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="payment_type" slot-scope="props" class="text-center">
        <span v-if="props.row.payment_type === 1" class="text-success">{{ props.row.payment_type_name }}</span>
        <span v-if="props.row.payment_type === 2" class="text-info">{{ props.row.payment_type_name }}</span>
      </div>
      <div slot="periodic_amount" slot-scope="props" class="text-center">
        <span>{{ props.row.periodic_amount | currency_number }}</span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-warning">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 3" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props" class="flex-div">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/investor-sip/update"
          :to="`/investor-sip/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status !== 1 && props.row.status !== 3"
          :props="{class: 'btn btn-link btn-success table-action edit'}"
          role="/investor-sip/active"
          @onclick="handleStatusActive(props.row.id)"
        >
          <i class="fa fa-check"></i>
        </role-button>
        <role-button
          v-if="props.row.status !== 2 && props.row.status !== 3"
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/investor-sip/pause"
        >
          <i class="fa fa-pause-circle"></i>
        </role-button>
        <role-button
          v-if="props.row.status !== 3"
          :props="{class: 'btn btn-link btn-danger table-action edit'}"
          role="/investor-sip/stop"
        >
          <i class="fa fa-ban"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import { callApiInvestorSipList } from '@/apis/investor_sip'
export default {
  component: {
    RoleButton
  },
  filters: {
    currency_number (num) {
      return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    }
  },
  data () {
    return {
      filters: {
        fund_code: '',
        distribution_agents: ''
      },
      columns: [
        'id',
        'fund_code',
        'distribution_agents',
        'investor_name',
        'id_code',
        'id_issuing_date',
        'payment_type',
        'start_time',
        'periodic_amount',
        'transaction_cycle',
        'date_of_sip_registraion',
        'mininum_period',
        'status',
        'action'
      ],
      options: {
        headings: {
          id: this.$t('user.ID'),
          fund_code: this.$t('investor_sip.fund'),
          distribution_agents: this.$t('investor_sip.Fund Distributor'),
          investor_name: this.$t('investor_sip.Investor s Full name'),
          id_code: this.$t('investor_sip.ID code'),
          id_issuing_date: this.$t('investor_sip.Date of Issue'),
          payment_type: this.$t('investor_sip.SIP Type'),
          start_time: this.$t('investor_sip.Start time'),
          periodic_amount: this.$t('investor_sip.Amount'),
          transaction_cycle: this.$t('investor_sip.Frequency'),
          date_of_sip_registraion: this.$t('investor_sip.Date of SIP registrantion'),
          mininum_period: this.$t('investor_sip.Minimum number of enrollment periods'),
          status: this.$t('investor_sip.Status'),
          action: this.$t('investor_sip.Action')
        },
        filterByColumn: true,
        sortable: [],
        requestFunction (data) {
          return callApiInvestorSipList(this, data)
            .then(function (data) {
              return data.response
            })
        }
      }
    }
  },
  methods: {
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    }
  }
}
</script>
<style scoped>
.flex-div {
  display: flex;
}
</style>
