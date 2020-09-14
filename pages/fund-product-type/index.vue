<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/fund-product-type/create" to="/fund-product-type/create">{{ $t('fund_product_type.Create New Fund Product Type') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.name" :placeholder="$t('fund_product_type.Search Name')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.code" :placeholder="$t('fund_product_type.Search Code')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 ">
              <select v-model="filters.status.value" class="form-control">
                <option value="">{{ $t('trading_order_fee_buy.Search status') }}</option>
                <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
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
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/fund-product-type/update"
          :to="`/fund-product-type/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('fund_product_type.Message Lock')}"
          role="/fund-product-type/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('fund_product_type.Message Active')}"
          role="/fund-product-type/active"
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
  import { callApiFundProductTypeList, callApiFundProductTypeActive, callApiFundProductTypeLock, callApiFundProductTypeGetStatus } from '@/apis/fund_product_type'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          name: '',
          code: '',
          status: {
            compare: '=',
            value: ''
          }
        },
        status: [],
        columns: ['id', 'name', 'code', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('test.index'),
            name: this.$t('fund_product_type.Name Fund Product Type'),
            code: this.$t('fund_product_type.Code Fund Product Type'),
            status: this.$t('fund_product_type.Description'),
            action: this.$t('common.action')
          },
          sortable: [
            'name',
            'code'
          ],
          filterByColumn: true,
          requestFunction (data) {
            return callApiFundProductTypeList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    },
    async created () {
      this.status = await callApiFundProductTypeGetStatus(this)
    },
    methods: {
      onSearch () {
        this.$refs.vuetable.setFilter(this.filters)
      },
      async lock (fundProductTypeId) {
        const result = await callApiFundProductTypeLock(this, { fund_product_type_id: fundProductTypeId })
        console.log(result)
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product_type.Lock success'),
            message: this.$t('fund_product_type.Lock fund product type success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('fund_product_type.Lock error'),
            message: this.$t('fund_product_type.Lock fund product type error')
          })
        }
      },
      async active (fundProductTypeId) {
        const result = await callApiFundProductTypeActive(this, { fund_product_type_id: fundProductTypeId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product_type.Active success'),
            message: this.$t('fund_product_type.Active fund product type success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('fund_product_type.Active error'),
            message: this.$t('fund_product_type.Active fund product type error')
          })
        }
      }
    }
  }
</script>
