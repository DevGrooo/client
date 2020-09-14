<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <role-button
          :props="{class: 'btn btn-primary btn-wd pull-right'}"
          role="/fund-product/create"
          to="/fund-product/create"
        >{{ $t('fund_product.add_fund_product') }}
        </role-button>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.name" :placeholder="$t('fund_product.name')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.code" :placeholder="$t('fund_product.code')" type="text" class="form-control" />
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
          role="/fund-product/update"
          :to="`/fund-product/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('fund_product.prop_up_lock')}"
          role="/fund-product/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('fund_product.prop_up_active')}"
          role="/fund-product/active"
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
  import { callApiFundProductList, callApiFundProductLock, callApiFundProductActive } from '@/apis/fund_product'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          name: '',
          code: ''
        },
        columns: ['id', 'fund_company.name', 'fund_certificate.name', 'fund_product_type.name', 'name', 'code', 'description', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('fund_product.id'),
            'fund_company.name': this.$t('fund_product.fund_company_id'),
            'fund_certificate.name': this.$t('fund_product.fund_certificate'),
            'fund_product_type.name': this.$t('fund_product.fund_product_type'),
            name: this.$t('fund_product.name'),
            code: this.$t('fund_product.code'),
            description: this.$t('fund_product.description'),
            status: this.$t('fund_product.status'),
            action: this.$t('common.action')
          },
          sortable: [
            'name',
            'code'
          ],
          filterByColumn: true,
          requestFunction (data) {
            return callApiFundProductList(this, data)
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
      async active (fundProductId) {
        const result = await callApiFundProductActive(this, { fund_product_id: fundProductId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product.Active Success'),
            message: this.$t('fund_product.Active fund_product success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('fund_product.Active Error')
          })
        }
      },
      async lock (fundProductId) {
        const result = await callApiFundProductLock(this, { fund_product_id: fundProductId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('fund_product.Lock Success'),
            message: this.$t('fund_product.Lock fund_product success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('fund_product.Lock Error')
          })
        }
      }
    }
  }
</script>
