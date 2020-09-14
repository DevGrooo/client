<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="id" slot-scope="props" class="text-center">
        <span v-if="props.row.id">{{ props.row.id }}</span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 3" class="text-danger">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 4" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action `edit', confirmText: $t('trading_session.prop_up_lock')}"
          role="/trading-order/cancel"
          @onClick="cancel(props.row.id)"
        >
          <i class="fa fa-ban"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-danger table-action display:none '}"
          role="/trading-order"
        >
          <i class="fa fa-ban" style="color: grey"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 3"
          :props="{class: 'btn btn-link btn-danger table-action display:none '}"
          role="/trading-order"
        >
          <i class="fa fa-ban" style="color: grey"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 4"
          :props="{class: 'btn btn-link btn-danger table-action display:none '}"
          role="/trading-order"
        >
          <i class="fa fa-ban" style="color: grey"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
  import RoleButton from '@/components/UI/form/RoleButton'
  import { callApiTradingSessionList, callApiTradingSessionCancel } from '@/apis/trading_session'

  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        columns: ['id', 'fund_company.name', 'trading_frequency.name', 'start_at', 'end_at', 'limit_order_at', 'nav', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('id'),
            'fund_company.name': this.$t('trading_session.fund_company'),
            'trading_frequency.name': this.$t('trading_session.trading_frequency_name'),
            name: this.$t('trading_session.trading_frequency_name'),
            start_at: this.$t('trading_session.start_at'),
            end_at: this.$t('trading_session.end_at'),
            limit_order_at: this.$t('trading_session.limit_order_at'),
            nav: this.$t('trading_session.nav'),
            status: this.$t('trading_session.status'),
            action: this.$t('common.action')
          },
          sortable: [],
          filterByColumn: true,
          requestFunction (data) {
            return callApiTradingSessionList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    },
    methods: {
      async cancel (Id) {
        const result = await callApiTradingSessionCancel(this, { trading_session_id: Id })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_session.Cancel Success'),
            message: this.$t('trading_session.Cancel trading-session success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('trading_session.Cancel Error')
          })
        }
      }
    }
  }
</script>
