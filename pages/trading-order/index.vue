<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/trading-order/create" to="/trading-order/create">{{ $t('trading_order.Add New') }}</role-button>
        </div>
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/trading-order/create" to="/trading-order/create">{{ $t('trading_order.Import') }}</role-button>
        </div>
        <!--        <div class="search-bar">-->
        <!--          <div class="row">-->
        <!--            <div class="col-md-3">-->
        <!--              <input v-model="filters.name" :placeholder="$t('bank.Search Name')" type="text" class="form-control" />-->
        <!--            </div>-->
        <!--            <div class="col-md-3 pl-1">-->
        <!--              <input v-model="filters.trade_name" :placeholder="$t('bank.Search Trade Name')" type="text" class="form-control" />-->
        <!--            </div>-->
        <!--            <div class="col-md-3 ">-->
        <!--              <select v-model="filters.status.value" class="form-control">-->
        <!--                <option value="">{{ $t('trading_order_fee_buy.Search status') }}</option>-->
        <!--                <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>-->
        <!--              </select>-->
        <!--            </div>-->
        <!--            <div class="col-md-3 pl-1">-->
        <!--              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="clear-fix"></div>
      </div>
      <div slot="id" slot-scope="props" class="text-center">
        <span v-if="props.row.id">{{ props.row.id }}</span>
      </div>
      <div slot="status" slot-scope="props">
        <span v-if="props.row.status === 1">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2">{{ props.row.status_name }}</span>
      </div>
      <div slot="vsd_status_name" slot-scope="props" class="text-center">
        <span v-if="props.row.vsd_status === 1" class="text-danger">{{ props.row.vsd_status_name }}</span>
        <span v-if="props.row.vsd_status === 2" class="text-success">{{ props.row.vsd_status_name }}</span>
      </div>
      <div slot="action">
          <i class="fa fa-ban" aria-hidden="true"></i>
      </div>
    </v-server-table>
  </div>
</template>
<script>
  import RoleButton from '@/components/UI/form/RoleButton'
  import { callApiTradingOrderList } from '@/apis/trading_order'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        columns: [
          'id',
          'investor.id_number',
          'investor.trading_account_number',
          'investor.name',
          'fund_distributor.name',
          'fund.name',
          'product_code.code',
          'order_type',
          'transaction_type',
          'sub_amount',
          'order_quantity',
          'switch_fund',
          'product_of_switch_fund',
          'trading_order',
          'ref',
          'status',
          'vsd_status_name',
          'action'
        ],
        options: {
          headings: {
            id: 'ID',
            'fund_distributor.name': this.$t('trading_order.distributor'),
            'investor.trading_account_number': this.$t('trading_order.trading account'),
            'investor.name': this.$t('trading_order.investor name'),
            'investor.id_number': this.$t('trading_order.ID code'),
            'fund.name': this.$t('trading_order.Fund'),
            'product_code.code': this.$t('trading_order.Product Code'),
            order_type: this.$t('trading_order.Order Type'),
            transaction_type: this.$t('trading_order.Transaction Type'),
            order_quantity: this.$t('trading_order.Order QUantity'),
            sub_amount: this.$t('trading_order.Sub Amount'),
            switching_fund: this.$t('trading_order.Switching Fund'),
            product_of_switch_fund: this.$t('trading_order.product of Switching Fund'),
            trading_order: this.$t('trading_order.trading frequency'),
            ref: this.$t('trading_order.ref'),
            status: this.$t('trading_order.Status'),
            vsd_status_name: this.$t('trading_order.VSD Status')
          },
          sortable: [],
          filterByColumn: true,
          requestFunction (data) {
            return callApiTradingOrderList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    }
  }
</script>
