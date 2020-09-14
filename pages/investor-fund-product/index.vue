<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary'}" role="/investor-fund-product/create" to="/investor-fund-product/create">{{ $t('investor_fund_product.create investor fund product') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
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
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('investor_fund_product.Message Lock') }"
          role="/investor-fund-product/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('investor_fund_product.Message Unlock') }"
          role="/investor-fund-product/active"
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
  callApiInvestorFundProductgetStatus,
  callApiInvestorFundProductList,
  callApiInvestorFundProductLock, callApiInvestorFundProductActive
} from '@/apis/investor_fund_product'
import { callApiFundProductGetList } from '@/apis/fund_product'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
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
        'fund_company.name',
        'fund_certificate.name',
        'fund_distributor.name',
        'investor.name',
        'fund_product.name',
        'currency',
        'status',
        'action'
      ],
      options: {
        headings: {
          id: this.$t('investor_fund_product.id'),
          'fund_company.name': this.$t('investor_fund_product.fund company'),
          'fund_certificate.name': this.$t('investor_fund_product.fund certificate'),
          'fund_distributor.name': this.$t('investor_fund_product.fund distributor'),
          'investor.name': this.$t('investor_fund_product.investor'),
          'fund_product.name': this.$t('investor_fund_product.fund product'),
          currency: this.$t('investor_fund_product.currency'),
          status: this.$t('investor_fund_product.status'),
          action: this.$t('common.action')
        },
        sortable: [],
        filterByColumn: true,
        requestFunction (data) {
          return callApiInvestorFundProductList(this, data)
            .then(function (data) {
              return data.response
            })
        }
      }
    }
  },
  async created () {
    this.status = await callApiInvestorFundProductgetStatus(this)
    this.fund_products = await callApiFundProductGetList(this)
  },
  methods: {
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    },
    async lock (investorFundProductId) {
      const result = await callApiInvestorFundProductLock(this, { investor_fund_product_id: investorFundProductId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor_fund_product.Lock success'),
          message: this.$t('investor_fund_product.Lock investor fund product success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor_fund_product.Lock error'),
          message: this.$t('investor_fund_product.Lock investor fund product error')
        })
      }
    },
    async active (investorFundProductId) {
      const result = await callApiInvestorFundProductActive(this, { investor_fund_product_id: investorFundProductId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor_fund_product.Active success'),
          message: this.$t('investor_fund_product.Active investor fund product success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor_fund_product.Active error'),
          message: this.$t('investor_fund_product.Active investor fund product error')
        })
      }
    }
  }
}
</script>
