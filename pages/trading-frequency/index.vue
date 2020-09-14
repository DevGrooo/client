<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/trading-frequency/create" to="/trading-frequency/create">{{ $t('trading_frequency.add') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.name" :placeholder="$t('trading_frequency.name')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="id" slot-scope="props" class="text-center">
        <span v-if="props.row.id">{{ props.row.id }}</span>
      </div>
      <div slot="type" slot-scope="props">
        <span v-if="props.row.type === 1">{{ $t('trading_frequency.wday') }}</span>
        <span v-if="props.row.type === 2">{{ $t('trading_frequency.mday') }}</span>
      </div>
      <div slot="wday" slot-scope="props">
        <span v-if="props.row.wday === 1">{{ $t('trading_frequency.wday2') }}</span>
        <span v-if="props.row.wday === 2">{{ $t('trading_frequency.wday3') }}</span>
        <span v-if="props.row.wday === 3">{{ $t('trading_frequency.wday4') }}</span>
        <span v-if="props.row.wday === 4">{{ $t('trading_frequency.wday5') }}</span>
        <span v-if="props.row.wday === 5">{{ $t('trading_frequency.wday6') }}</span>
        <span v-if="props.row.wday === 6">{{ $t('trading_frequency.wday7') }}</span>
        <span v-if="props.row.wday === 0">{{ $t('trading_frequency.wday0') }}</span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action `edit', confirmText: $t('trading_frequency.prop_up_lock')}"
          role="/trading-frequency/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('trading_frequency.prop_up_lock')}"
          role="/trading-frequency/active"
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
  import { callApiTradingFrequencyList, callApiTradingFrequencyActive, callApiTradingFrequencyLock } from '@/apis/trading-frequency'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          name: ''
        },
        columns: ['id', 'fund_company.name', 'type', 'name', 'wday', 'mday', 'cut_off_date', 'cut_off_hour', 'cut_off_time', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('trading_frequency.id'),
            'fund_company.name': this.$t('trading_frequency.fund_company_name'),
            type: this.$t('trading_frequency.type'),
            name: this.$t('trading_frequency.name'),
            wday: this.$t('trading_frequency.wday'),
            mday: this.$t('trading_frequency.mday'),
            cut_off_date: this.$t('trading_frequency.cut_off_date'),
            cut_off_hour: this.$t('trading_frequency.cut_off_hour'),
            cut_off_time: this.$t('trading_frequency.cut_off_time'),
            status: this.$t('trading_frequency.status'),
            action: this.$t('common.action')
          },
          sortable: [
            'name'
          ],
          filterByColumn: true,
          requestFunction (data) {
            return callApiTradingFrequencyList(this, data)
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
      },
      async active (Id) {
        const result = await callApiTradingFrequencyActive(this, { trading_frequency_id: Id })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_frequency.Active Success'),
            message: this.$t('trading_frequency.Active trading_frequency success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('trading_frequency.Active Error')
          })
        }
      },
      async lock (Id) {
        const result = await callApiTradingFrequencyLock(this, { trading_frequency_id: Id })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_frequency.Lock Success'),
            message: this.$t('trading_frequency.Lock trading_frequency success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('trading_frequency.Lock Error')
          })
        }
      }
    }
  }
</script>
