<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/investor-bank-account/create" to="/investor-bank-account/create">
            {{ $t('investorBankAccount.Create Investor Bank Account') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-2">
              <input v-model="filters.account_number" :placeholder="$t('investorBankAccount.Account Number')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.status.value" :placeholder="$t('investorBankAccount.Status')" class="form-control">
                <option value="">{{ $t('investor.All Status') }}</option>
                <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div slot="id" slot-scope="props" class="text-center">
        {{ props.row.id }}
      </div>
      <div slot="is_default" slot-scope="props" class="text-center">
        <role-button
          v-if="props.row.is_default !== 1"
          :props="{class: 'btn btn-link btn-info table-action edit', confirmText: $t('investorBankAccount.Confirm Set Default Bank Account') }"
          role="/investor-bank-account/set-default"
          @onClick="setDefault(props.row.id)"
        >
          <i class="fa fa-circle-o"></i>
        </role-button>
        <span v-else class="text-info">
          <i class="fa fa-dot-circle-o"></i>
        </span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ $t('common.Status.Active') }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ $t('common.Status.Lock') }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('investorBankAccount.Confirm Lock Bank Account') }"
          role="/investor-bank-account/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('investorBankAccount.Confirm Unlock Bank Account')}"
          role="/investor-bank-account/active"
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
  callApiInvestorBankAccountList,
  callApiInvestorBankAccountLock,
  callApiInvestorBankAccountActive,
  callApiInvestorBankAccountSetDefault,
  callApiInvestorBankAccountGetStatus
} from '@/apis/investor_bank_account'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
        name: '',
        status: {
          compare: '=',
          value: ''
        }
      },
      status: [],
      columns: [
          'id',
          'bank.name',
          'fund_distributor.name',
          'investor.name',
          'account_holder',
          'account_number',
          'branch',
          'is_default',
          'status',
          'action'],
      options: {
        headings: {
          id: this.$t('investorBankAccount.Id'),
          'fund_distributor.name': this.$t('investorBankAccount.Distributor Name'),
          'bank.name': this.$t('investorBankAccount.Bank Name'),
          'investor.name': this.$t('investorBankAccount.Investor Name'),
          account_holder: this.$t('investorBankAccount.Account Holder'),
          account_number: this.$t('investorBankAccount.Account Number'),
          branch: this.$t('investorBankAccount.Branch'),
          is_default: this.$t('investorBankAccount.Default'),
          status: this.$t('investorBankAccount.Status'),
          action: this.$t('common.action')
        },
        filterByColumn: true,
        sortable: [],
        requestFunction (data) {
          return callApiInvestorBankAccountList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  async created () {
    this.status = await callApiInvestorBankAccountGetStatus(this)
  },
  methods: {
    async lock (id) {
      const result = await callApiInvestorBankAccountLock(this, { investor_bank_account_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investorBankAccount.Lock Success'),
          message: this.$t('investorBankAccount.Lock Success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investorBankAccount.Lock Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiInvestorBankAccountActive(this, { investor_bank_account_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investorBankAccount.Active Success'),
          message: this.$t('investorBankAccount.Active Success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investorBankAccount.Active Error'),
          message: result.message
        })
      }
    },
    async setDefault (id) {
      const result = await callApiInvestorBankAccountSetDefault(this, { investor_bank_account_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investorBankAccount.Set Default Success'),
          message: this.$t('investorBankAccount.Set Default Success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investorBankAccount.Set Default Error'),
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
