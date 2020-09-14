<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/referral-bank/create" to="/referral-bank/create">{{ $t('referral_bank.Create new REFERRAL Bank') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.name" :placeholder="$t('referral_bank.name')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.trade_name" :placeholder="$t('referral_bank.trade')" type="text" class="form-control" />
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
          role="/referral-bank/update"
          :to="`/referral-bank/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('referral_bank.prop_up_lock')}"
          role="/referral-bank/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('referral_bank.prop_up_active')}"
          role="/referral-bank/active"
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
  import { callApiReferralBankList, callApiReferralBankLock, callApiReferralBankActive, callApiReferralBankGetStatus } from '@/apis/referral_bank'
  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          name: '',
          trade_name: '',
          status: {
            compare: '=',
            value: ''
          }
        },
        status: [],
        columns: ['id', 'fund_company.name', 'name', 'trade_name', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('bank.id'),
            'fund_company.name': this.$t('trading_frequency.fund_company_name'),
            name: this.$t('referral_bank.name'),
            trade_name: this.$t('referral_bank.trade'),
            status: this.$t('bank.status'),
            action: this.$t('bank.Action')
          },
          sortable: [
            'name',
            'trade_name'
          ],
          filterByColumn: true,
          requestFunction (data) {
            return callApiReferralBankList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    },
    async created () {
      this.status = await callApiReferralBankGetStatus(this)
    },
    methods: {
      onSearch () {
        this.$refs.vuetable.setFilter(this.filters)
      },
      async lock (Id) {
        const result = await callApiReferralBankLock(this, { referral_bank_id: Id })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('referral_bank.Lock Success'),
            message: this.$t('referral_bank.Lock referral_bank success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('referral_bank.Lock Error')
          })
        }
      },
      async active (Id) {
        const result = await callApiReferralBankActive(this, { referral_bank_id: Id })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('referral_bank.Active Success'),
            message: this.$t('referral_bank.Active referral_bank success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('referral_bank.Active Error')
          })
        }
      }
    }
  }
</script>
