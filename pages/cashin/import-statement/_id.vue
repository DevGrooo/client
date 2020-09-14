<template>
  <div class="row">
    <div class="col-md-12">
      <v-server-table
        v-if="statement !== null && statement.status === 3"
        ref="vuetable"
        url=""
        :columns="columns"
        :options="options"
        @sorted="sorted"
      >
        <div slot="afterFilterWrapper">
          <div class="pull-right"></div>
          <div class="search-bar">
            <div class="row">
              <div class="col-md-5">
                <input v-model="filters.bank_trans_note" :placeholder="$t('statementLine.Transaction Detail')" type="text" class="form-control" />
              </div>
              <div class="col-md-2 pl-1">
                <select v-model="filters.status.value" :placeholder="$t('statementLine.Status')" class="form-control">
                  <option value="">{{ $t('statementLine.All Status') }}</option>
                  <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
                </select>
              </div>
              <div class="col-md-2 pl-1">
                <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
              </div>
            </div>
          </div>
          <div class="clear-fix"></div>
        </div>
        <div slot="data.company_name" slot-scope="props" style="width:200px;">
          {{ props.row.data.company_name }}
        </div>
        <div slot="data.transaction_amount" slot-scope="props" class="text-right">
          {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: props.row.data.currency_code }).format(props.row.data.transaction_amount) }}
        </div>
        <div slot="data.currency_code" slot-scope="props" class="text-center">
          {{ props.row.data.currency_code }}
        </div>
        <div slot="data.dr_cr_flag" slot-scope="props" class="text-center">
          {{ props.row.data.dr_cr_flag }}
        </div>
        <div slot="data.transaction_detail" slot-scope="props" style="min-width:200px;">
          {{ props.row.data.transaction_detail }}
        </div>
        <div slot="warnings" slot-scope="props" class="text-warning">
          <div v-for="(warning, index) in props.row.warnings" :key="index" style="width:200px; font-size:11px;">- {{ warning }}</div>
        </div>
        <div slot="errors" slot-scope="props" class="text-danger text-left">
          <div v-for="(error, index) in props.row.errors" :key="index" style="width:200px; font-size:11px;">- {{ error }}</div>
        </div>
        <div slot="status" slot-scope="props" class="text-center" style="width:100px;">
          <span v-if="props.row.status === 1">{{ props.row.status_name }}</span>
          <span v-if="props.row.status === 2" class="text-primary">{{ props.row.status_name }}</span>
          <span v-if="props.row.status === 3" class="text-danger">{{ props.row.status_name }}</span>
          <span v-if="props.row.status === 4" class="text-success">{{ props.row.status_name }}</span>
        </div>
      </v-server-table>
      <modal-progress ref="modal" />
    </div>
  </div>
</template>
<script>
import ModalProgress from '@/components/UI/modal/ModalProgress'
import { callApiStatementDetail, callApiStatementLine, callApiStatementGetLineStatus } from '@/apis/statement'
export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    ModalProgress
  },
  data () {
    return {
      statement: null,
      status: [],
      filters: {
        bank_trans_note: '',
        status: {
          compare: '=',
          value: ''
        }
      },
      sort: null,
      columns: [
        'id',
        'data.company_name',
        'data.account_number',
        'data.currency_code',
        // 'data.account_type',
        // 'data.opening_ledger_balance',
        // 'data.closing_ledger_balance',
        // 'data.opening_available_balance',
        // 'data.closing_available_balance',
        // 'data.as_at_date',
        'data.value_date',
        'data.transaction_amount',
        'data.dr_cr_flag',
        // 'data.cheque_number',
        // 'data.branch_code',
        // 'data.transaction_reference',
        // 'data.customer_reference',
        'data.transaction_detail',
        // 'data.processing_branch',
        // 'data.bank_code',
        // 'data.account_name',
        // 'data.transaction_type',
        'status',
        'warnings',
        'errors'
      ],
      options: {
        headings: {
          id: this.$t('statementLine.Id'),
          'data.company_name': this.$t('statementLine.Company Name'),
          'data.account_number': this.$t('statementLine.Account Number'),
          'data.currency_code': this.$t('statementLine.Currency Code'),
          // 'data.account_type': this.$t('statementLine.Account Type'),
          // 'data.opening_ledger_balance': this.$t('statementLine.Opening Ledger Balance'),
          // 'data.closing_ledger_balance': this.$t('statementLine.Closing Ledger Balance'),
          // 'data.opening_available_balance': this.$t('statementLine.Opening Available Balance'),
          // 'data.closing_available_balance': this.$t('statementLine.Closing Available Balance'),
          // 'data.as_at_date': this.$t('statementLine.As At Date'),
          'data.value_date': this.$t('statementLine.Value Date'),
          'data.transaction_amount': this.$t('statementLine.Transaction Amount'),
          'data.dr_cr_flag': this.$t('statementLine.DR / CR Flag'),
          // 'data.cheque_number': this.$t('statementLine.Cheque Number'),
          // 'data.branch_code': this.$t('statementLine.Branch Code'),
          // 'data.transaction_reference': this.$t('statementLine.Transaction Reference'),
          // 'data.customer_reference': this.$t('statementLine.Customer Reference'),
          'data.transaction_detail': this.$t('statementLine.Transaction Detail'),
          // 'data.processing_branch': this.$t('statementLine.Processing Branch'),
          // 'data.bank_code': this.$t('statementLine.Bank Code'),
          // 'data.account_name': this.$t('statementLine.Account Name'),
          // 'data.transaction_type': this.$t('statementLine.Transaction Type'),
          status: this.$t('statementLine.Status'),
          warnings: this.$t('statementLine.Warnings'),
          errors: this.$t('statementLine.Errors')
        },
        filterByColumn: true,
        sortable: [],
        perPage: 25,
        requestFunction (data) {
          data.statement_id = this.$route.params.id
          return callApiStatementLine(this, data).then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  watch: {
    statement (value) {
      this.$refs.modal.setData(value.processed_line, value.total_line)
    }
  },
  async created () {
    this.status = await callApiStatementGetLineStatus(this)
  },
  mounted () {
    this.$refs.modal.show()
    this._checkStatusStatement()
  },
  methods: {
    async _checkStatusStatement () {
      const data = await callApiStatementDetail(this, { statement_id: this.$route.params.id })
      if (data.status === true) {
        this.statement = data.response
        if (this.statement.status !== 3) {
          setTimeout(() => this._checkStatusStatement(), 1000)
        } else {
          this.$refs.modal.hide()
        }
      } else {
        this.$nuxt.context.error(data)
      }
    },
    sorted (sort) {
      this.sort = sort
    },
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    }
  }
}
</script>
