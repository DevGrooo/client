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
      </div>
    </v-server-table>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import { callApiSettingCommissionGetList } from '@/apis/setting_commission'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      columns: [
        'start_at',
        'fund_distributor.name',
        'min_amount',
        'sell_commission',
        'maintance_commission_amount',
        'action'
      ],
      options: {
        headings: {
          start_at: 'Setting date',
          'fund_distributor.name': 'Type of agent',
          min_amount: 'Amount of investment',
          sell_commission: 'Sell Fee (%)',
          maintance_commission_amount: 'Holding Fee (%)',
          action: this.$t('common.action')
        },
        sortable: ['start_at', 'fund_distributor.name'],
        filterByColumn: true,
        requestFunction (data) {
          return callApiSettingCommissionGetList(this, data).then(function (
            data
          ) {
            return data.response
          })
        }
      }
    }
  },
  methods: {
    handleShow (id) {}
  }
}
</script>
