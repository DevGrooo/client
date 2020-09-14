<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options" @sorted="sorted">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary btn-wd pull-right'}" role="/cashin/import-statement" @onClick="$refs.modal.show()">
            {{ $t('investor.Import file excel') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-2 pl-1">
              <input v-model="filters.id.value" :placeholder="$t('cashin.Id')" type="text" class="form-control" />
            </div>
            <div class="col-md-2">
              <input v-model="filters.bank_trans_note" :placeholder="$t('cashin.Transaction Detail')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.fund_distributor_id.value" :placeholder="$t('cashin.Distributor Name')" class="form-control">
                <option value="">{{ $t('cashin.All Fund Distributor') }}</option>
                <option v-for="(item, index) in fund_distributors" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.fund_product_id.value" :placeholder="$t('cashin.Product Name')" class="form-control">
                <option value="">{{ $t('cashin.All Fund Product') }}</option>
                <option v-for="(item, index) in fund_products" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.status.value" :placeholder="$t('cashin.Status')" class="form-control">
                <option value="">{{ $t('cashin.All Status') }}</option>
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
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-warning">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 3" class="text-danger">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 4" class="text-success">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          v-if="props.row.actions.includes('update-investor')"
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/cashin/update-investor"
          :to="`/cashin/update-investor/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('paid')"
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/cashin/paid"
          :to="`/cashin/paid/${props.row.id}`"
        >
          <i class="fa fa-university"></i>
        </role-button>
      </div>
      <div slot="amount" slot-scope="props">
        {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: props.row.currency }).format(props.row.amount) }}
      </div>
    </v-server-table>
    <modal-upload
      ref="modal"
      header="Import file excel"
      file-title="File excel"
      file-accept=".xls, .xlsx, .csv"
      button-title="Import"
      validate-require-message="File excel is required"
      @onUpload="importStatement"
    >
      <template slot="form">
        <b-input-hidden name="fund_distributor_id" :value="1" />
      </template>
    </modal-upload>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import ModalUpload from '@/components/UI/modal/ModalUpload'
import BInputHidden from '@/components/UI/form/BInputHidden'
import {
  callApiCashinList,
  callApiCashinImportStatement,
  callApiCashinGetStatus
} from '@/apis/cashin'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
import { callApiFundProductGetList } from '@/apis/fund_product'
export default {
  name: 'CashinList',
  components: {
    RoleButton,
    ModalUpload,
    BInputHidden
  },
  data () {
    return {
      filters: {
        id: {
          compare: '=',
          value: ''
        },
        fund_distributor_id: {
          compare: '=',
          value: ''
        },
        fund_product_id: {
          compare: '=',
          value: ''
        },
        bank_trans_note: '',
        status: {
          compare: '=',
          value: ''
        }
      },
      sort: null,
      fund_distributors: [],
      fund_products: [],
      status: [],
      vsd_status: [],
      columns: [
        'id',
        'fund_distributor_name',
        'supervising_bank_name',
        'fund_distributor_bank_account_account_holder',
        'fund_distributor_bank_account_account_number',
        // 'fund_distributor_bank_account_branch',
        'fund_certificate_name',
        'fund_product_name',
        'investor_name',
        'amount',
        // 'currency',
        'bank_trans_note',
        'bank_paid_at',
        'perform_at',
        'status',
        'action'
      ],
      options: {
        headings: {
          id: this.$t('cashin.Id'),
          fund_distributor_name: this.$t('cashin.Distributor Name'),
          supervising_bank_name: this.$t('cashin.Supervising Bank Name'),
          fund_distributor_bank_account_account_holder: this.$t('cashin.Account Holder'),
          fund_distributor_bank_account_account_number: this.$t('cashin.Account Number'),
          fund_distributor_bank_account_branch: this.$t('cashin.Branch'),
          fund_certificate_name: this.$t('cashin.Certificate Name'),
          fund_product_name: this.$t('cashin.Product Name'),
          investor_name: this.$t('cashin.Investor Name'),
          amount: this.$t('cashin.Amount'),
          currency: this.$t('cashin.Currency'),
          bank_paid_at: this.$t('cashin.Paid Time'),
          bank_trans_note: this.$t('cashin.Transaction Detail'),
          perform_at: this.$t('cashin.Perform Time'),
          status: this.$t('cashin.Status'),
          action: this.$t('common.action')
        },
        filterByColumn: true,
        sortable: ['id', 'bank_paid_at', 'perform_at'],
        requestFunction (data) {
          return callApiCashinList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  async created () {
    this.fund_distributors = await callApiFundDistributorGetList(this)
    this.fund_products = await callApiFundProductGetList(this)
    this.status = await callApiCashinGetStatus(this)
  },
  methods: {
    async importStatement (params) {
      const result = await callApiCashinImportStatement(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Upload Success'),
          message: this.$t('common.Upload Success')
        })
        this.$refs.modal.uploading = false
        this.$router.push(this.localePath('/cashin/import-statement/' + result.response.statement_id))
        this.$refs.modal.hide()
      } else {
        this.flashMessage.error({
          title: this.$t('common.Upload Error'),
          message: result.message
        })
        this.$refs.modal.uploading = false
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
