<template>
  <div>
    <v-server-table ref="vuetable" url :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button
            :props="{class: 'btn btn-primary'}"
            role="/setting-commission/create"
            to="/setting-commission/create"
          >ADD NEW</role-button>
        </div>
      </div>
      <div slot="action" slot-scope="props">
        <nuxt-link
          class="btn btn-primary btn-sm"
          data-toggle="tooltip"
          data-placement="top"
          :title="$t('common.detail')"
          :to="`/setting-commission/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </nuxt-link>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('account_commission.Confirm Lock Account Commission')}"
          role="/user/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('account_commission.Confirm Unlock Account Commission')}"
          role="/user/active"
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
import { callApiAccountCommissionGetList, callApiAccountCommissionLock, callApiAccountCommissionActive } from '@/apis/account_commission'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      columns: [
        'id',
        'ref_id',
        'ref_type',
        'balance',
        'balance_available',
        'balance_freezing',
        'balance_waiting',
        'action'
      ],
      options: {
        headings: {
          id: 'STT',
          ref_id: 'Ref Id',
          ref_type: 'Ref Type',
          balance: 'Balance',
          balance_available: 'Balance Available',
          balance_freezing: 'Balance Freezing',
          balance_waiting: 'Balance Waiting',
          action: this.$t('common.action')
        },
        sortable: ['start_at', 'fund_distributor.name'],
        filterByColumn: true,
        requestFunction (data) {
          return callApiAccountCommissionGetList(this, data).then(function (
            data
          ) {
            return data.response
          })
        }
      }
    }
  },
  methods: {
    async lock (accountCommissionId) {
      const result = await callApiAccountCommissionLock(this, { account_commission_id: accountCommissionId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('account_commission.Lock Success'),
          message: this.$t('account_commission.Lock Account Commission Success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('account_commission.Lock Error'),
          message: result.message
        })
      }
    },
    async active (accountCommissionId) {
      const result = await callApiAccountCommissionActive(this, { account_commission_id: accountCommissionId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('account_commission.Active Success'),
          message: this.$t('account_commission.Active user success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('account_commission.Active Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
