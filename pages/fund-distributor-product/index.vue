<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/fund-distributor-product/create" to="/fund-distributor-product/create">{{ $t('fundDistributorProduct.Add') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <select v-model="filters.fund_distributor_id.value" class="form-control">
                <option value="">{{ $t('fundDistributorProduct.All Distributor') }}</option>
                <option v-for="(item, index) in fund_distributors" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-3 pl-1">
              <select v-model="filters.fund_product_type_id.value" class="form-control">
                <option value="">{{ $t('fundDistributorProduct.All Product Type') }}</option>
                <option v-for="(item, index) in fund_product_types" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('fundDistributorProduct.Search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="account_holder" slot-scope="props">
        {{ props.row.fund_distributor_bank_account.account_holder }}
      </div>
      <div slot="account_number" slot-scope="props">
        {{ props.row.fund_distributor_bank_account.account_number }}
      </div>
      <div slot="branch" slot-scope="props">
        {{ props.row.fund_distributor_bank_account.branch }}
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ $t('common.Status.Active') }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ $t('common.Status.Lock') }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/fund-distributor-product/update"
          :to="`/fund-distributor-product/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('fundDistributorProduct.Confirm Lock Distributor Product')}"
          role="/fund-distributor-product/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('fundDistributorProduct.Confirm Unlock Distributor Product')}"
          role="/fund-distributor-product/active"
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
import { callApiFundDistributorProductList, callApiFundDistributorProductLock, callApiFundDistributorProductActive } from '@/apis/fund_distributor_product'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
import { callApiFundProductTypeGetList } from '@/apis/fund_product_type'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
        fund_distributor_id: {
          compare: '=',
          value: ''
        },
        fund_product_type_id: {
          compare: '=',
          value: ''
        }
      },
      fund_distributors: [],
      fund_product_types: [],
      columns: [
          'id',
          'fund_distributor.name',
          'fund_product_type.name',
          'fund_product.name',
          'account_holder',
          'account_number',
          'branch',
          'status',
          'action'],
      options: {
        headings: {
          id: this.$t('fundDistributorProduct.Id'),
          'fund_distributor.name': this.$t('fundDistributorProduct.Distributor Name'),
          'fund_product_type.name': this.$t('fundDistributorProduct.Product Type'),
          'fund_product.name': this.$t('fundDistributorProduct.Product Name'),
          account_holder: this.$t('fundDistributorProduct.Account Holder'),
          account_number: this.$t('fundDistributorProduct.Account Number'),
          branch: this.$t('fundDistributorProduct.Branch'),
          status: this.$t('fundDistributorProduct.Status'),
          action: this.$t('common.action')
        },
        filterByColumn: true,
        sortable: [],
        requestFunction (data) {
          return callApiFundDistributorProductList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  async created () {
    this.fund_distributors = await callApiFundDistributorGetList(this)
    this.fund_product_types = await callApiFundProductTypeGetList(this)
  },
  methods: {
    async lock (id) {
      const result = await callApiFundDistributorProductLock(this, { fund_distributor_product_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorProduct.Lock Success'),
          message: this.$t('fundDistributorProduct.Lock Success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorProduct.Lock Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiFundDistributorProductActive(this, { fund_distributor_product_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('fundDistributorProduct.Active Success'),
          message: this.$t('fundDistributorProduct.Active Success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('fundDistributorProduct.Active Error'),
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
