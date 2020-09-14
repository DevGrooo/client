<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary'}" role="/trading-order-fee-buy/create" to="/trading-order-fee-buy/create">{{ $t('trading_order_fee_buy.create trading order fee buy') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="row-search-1 row col-md-12">
              <div class="col-md-3">
                <input v-model="filters.min_amount" :placeholder="$t('trading_order_fee_buy.Search min amount')" type="text" class="form-control" />
              </div>
              <div class="col-md-3">
                <input v-model="filters.fee_percent" :placeholder="$t('trading_order_fee_buy.Search fee percent')" type="text" class="form-control" />
              </div>
            </div>
            <div class="row-search-2 row col-md-12">
              <div class="col-md-3 ">
                <select v-model="filters.fund_product_id" class="form-control">
                  <option value="">{{ $t('trading_order_fee_buy.Search fund product') }}</option>
                  <option v-for="(item, index) in fund_products" :key="index" :value="item.value">{{ item.title }}</option>
                </select>
              </div>
              <div class="col-md-3 ">
                <select v-model="filters.status.value" class="form-control">
                  <option value="">{{ $t('trading_order_fee_buy.Search status') }}</option>
                  <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
                </select>
              </div>
              <div class="col-md-2 pl-1">
                <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="id" slot-scope="props" class="text-center">
        <span v-if="props.row.id">{{ props.row.id }}</span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 5" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('trading_order_fee_buy.Message Lock') }"
          role="/trading-order-fee-buy/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <span
          v-if="props.row.status === 5"
          class="btn btn-link btn-secondary table-action edit"
        >
          <i class="fa fa-ban" aria-hidden="true"></i>
        </span>
      </div>
    </v-server-table>
  </div>
</template>
<script>
  import RoleButton from '@/components/UI/form/RoleButton'
  import { callApiTradingOrderFeeBuyList, callApiTradingOrderFeeBuyLock, callApiTradingOrderFeeBuyGetStatus } from '@/apis/trading_order_fee_buy'
  import { callApiFundProductGetList } from '@/apis/fund_product'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          min_amount: '',
          fee_percent: '',
          fund_product_id: '',
          status: {
            compare: '=',
            value: ''
          }
        },
        fund_products: [],
        status: [],
        columns: [
          'id',
          'start_at',
          'fund_product.name',
          'min_amount',
          'fee_percent',
          'status',
          'action'
        ],
        options: {
          headings: {
            id: this.$t('trading_order_fee_buy.id'),
            start_at: this.$t('trading_order_fee_buy.setting date'),
            'fund_product.name': this.$t('trading_order_fee_buy.fund product'),
            min_amount: this.$t('trading_order_fee_buy.target'),
            fee_percent: this.$t('trading_order_fee_buy.fee'),
            status: this.$t('trading_order_fee_buy.status'),
            action: this.$t('common.action')
          },
          sortable: [],
          filterByColumn: true,
          requestFunction (data) {
            return callApiTradingOrderFeeBuyList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    },
    async created () {
      this.fund_products = await callApiFundProductGetList(this)
      this.status = await callApiTradingOrderFeeBuyGetStatus(this)
    },
    methods: {
      onSearch () {
        this.$refs.vuetable.setFilter(this.filters)
      },
      async lock (tradingOrderFeeBuyId) {
        const result = await callApiTradingOrderFeeBuyLock(this, { trading_order_fee_buy_id: tradingOrderFeeBuyId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('trading_order_fee_buy.Lock success'),
            message: this.$t('trading_order_fee_buy.Lock trading order fee buy success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('trading_order_fee_buy.Lock error'),
            message: this.$t('trading_order_fee_buy.Lock trading order fee buy error')
          })
        }
      }
    }
  }
</script>
<style>
  .row-search-1 {
    margin-bottom: 5px;
  }
</style>
