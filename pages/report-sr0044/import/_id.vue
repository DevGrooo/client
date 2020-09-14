<template>
  <div class="row">
    <div class="col-md-12">
      <v-server-table
        v-if="file_import !== null && file_import.status === 3"
        ref="vuetable"
        url=""
        :columns="columns"
        :options="options"
        @sorted="sorted"
      >
        <div slot="afterFilterWrapper">
          <div class="pull-right">
            <template v-if="file_import.total_error === 0 && file_import.total_warning === 0">
              <div class="alert alert-info alert-with-icon pull-left">
                <span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">File import is valid. Click button "Import"</span>
              </div>
              <button class="btn btn-primary btn-wd" @click="importTransactionFund">Import</button>
            </template>
            <template v-if="file_import.total_error > 0">
              <div class="alert alert-danger alert-with-icon pull-left">
                <span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">File import has error</span>
              </div>
            </template>
            <template v-else-if="file_import.total_warning > 0">
              <div class="alert alert-warning alert-with-icon pull-left">
                <span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">File import has warning</span>
              </div>
            </template>
          </div>
          <div class="search-bar">
            <div class="row">
              <div class="col-md-2 pl-1">
                <select v-model="filters.status.value" :placeholder="$t('fileImport.Status')" class="form-control">
                  <option value="">{{ $t('fileImport.All Status') }}</option>
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
        <div slot="data.mbname" slot-scope="props" style="min-width:200px;">
          {{ props.row.data.mbname }}
        </div>
        <div slot="data.fullname" slot-scope="props" style="min-width:180px;">
          {{ props.row.data.fullname }}
        </div>
        <div slot="data.status" slot-scope="props" style="min-width:120px;" class="text-center">
          {{ props.row.data.status }}
        </div>
        <div slot="data.name" slot-scope="props" style="min-width:200px;">
          {{ props.row.data.name }}
        </div>
        <div slot="data.feename" slot-scope="props" style="min-width:180px;">
          {{ props.row.data.feename }}
        </div>
        <div slot="data.dbcode" slot-scope="props" class="text-center">
          {{ props.row.data.dbcode }}
        </div>
        <div slot="data.dealtype" slot-scope="props" class="text-center">
          {{ props.row.data.dealtype }}
        </div>
        <div slot="data.actype" slot-scope="props" style="min-width:100px;" class="text-center">
          {{ props.row.data.actype }}
        </div>
        <div slot="data.srexetype" slot-scope="props" style="min-width:120px;" class="text-center">
          {{ props.row.data.srexetype }}
        </div>
        <div slot="data.feeamt" slot-scope="props" class="text-right">
          {{ props.row.data.feeamt }}
        </div>
        <div slot="data.taxamt" slot-scope="props" class="text-right">
          {{ props.row.data.taxamt }}
        </div>
        <div slot="data.matchamt" slot-scope="props" class="text-right">
          {{ props.row.data.matchamt }}
        </div>
        <div slot="data.matchamtnr" slot-scope="props" class="text-right">
          {{ props.row.data.matchamtnr }}
        </div>
        <div slot="data.matchamtns" slot-scope="props" class="text-right">
          {{ props.row.data.matchamtns }}
        </div>
        <div slot="data.orderamt" slot-scope="props" class="text-right">
          {{ props.row.data.orderamt }}
        </div>
        <div slot="data.matchqttynr" slot-scope="props" class="text-right">
          {{ props.row.data.matchqttynr }}
        </div>
        <div slot="data.matchqttyns" slot-scope="props" class="text-right">
          {{ props.row.data.matchqttyns }}
        </div>
        <div slot="data.orderqtty" slot-scope="props" class="text-right">
          {{ props.row.data.orderqtty }}
        </div>
        <div slot="data.matchamtt" slot-scope="props" class="text-right">
          {{ props.row.data.matchamtt }}
        </div>
        <div slot="data.feeamc" slot-scope="props" class="text-right">
          {{ props.row.data.feeamc }}
        </div>
        <div slot="data.feedxx" slot-scope="props" class="text-right">
          {{ props.row.data.feedxx }}
        </div>
        <div slot="data.feefund" slot-scope="props" class="text-right">
          {{ props.row.data.feefund }}
        </div>
        <div slot="data.feetotal" slot-scope="props" class="text-right">
          {{ props.row.data.feetotal }}
        </div>
        <div slot="data.nav" slot-scope="props" class="text-right">
          {{ props.row.data.nav }}
        </div>
        <div slot="data.totalnav" slot-scope="props" class="text-right">
          {{ props.row.data.totalnav }}
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
import { callApiTransactionFundImport } from '@/apis/transaction_fund'
import { callApiFileImportDetail, callApiFileImportLine, callApiFileImportGetLineStatus } from '@/apis/file_import'
export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    ModalProgress
  },
  data () {
    return {
      file_import: null,
      status: [],
      filters: {
        status: {
          compare: '=',
          value: ''
        }
      },
      sort: null,
      columns: [
        'id',
        'data.fundname',
        'data.mbname',
        'data.fullname',
        'data.idcode',
        'data.dbcode',
        'data.iddate',
        'data.custodycd',
        'data.srexetype',
        'data.dealtype',
        'data.exectype',
        'data.txdate',
        'data.feeamt',
        'data.taxamt',
        'data.pv_symbol',
        'data.matchamt',
        'data.matchamtnr',
        'data.matchamtns',
        'data.orderamt',
        'data.matchqttynr',
        'data.matchqttyns',
        'data.orderqtty',
        'data.matchamtt',
        'data.orderid',
        'data.status',
        'data.actype',
        'data.feeamc',
        'data.feedxx',
        'data.feefund',
        'data.feetotal',
        'data.nav',
        'data.totalnav',
        'data.tradingdate',
        'data.name',
        'data.symbol',
        'data.feename',
        'data.feeid',
        'status',
        'warnings',
        'errors'
      ],
      options: {
        headings: {
          id: this.$t('sr0044.Id'),
          'data.fundname': this.$t('sr0044.fundname'),
          'data.mbname': this.$t('sr0044.mbname'),
          'data.fullname': this.$t('sr0044.fullname'),
          'data.idcode': this.$t('sr0044.idcode'),
          'data.dbcode': this.$t('sr0044.dbcode'),
          'data.iddate': this.$t('sr0044.iddate'),
          'data.custodycd': this.$t('sr0044.custodycd'),
          'data.srexetype': this.$t('sr0044.srexetype'),
          'data.dealtype': this.$t('sr0044.dealtype'),
          'data.exectype': this.$t('sr0044.exectype'),
          'data.txdate': this.$t('sr0044.txdate'),
          'data.feeamt': this.$t('sr0044.feeamt'),
          'data.taxamt': this.$t('sr0044.taxamt'),
          'data.pv_symbol': this.$t('sr0044.pv_symbol'),
          'data.matchamt': this.$t('sr0044.matchamt'),
          'data.matchamtnr': this.$t('sr0044.matchamtnr'),
          'data.matchamtns': this.$t('sr0044.matchamtns'),
          'data.orderamt': this.$t('sr0044.orderamt'),
          'data.matchqttynr': this.$t('sr0044.matchqttynr'),
          'data.matchqttyns': this.$t('sr0044.matchqttyns'),
          'data.orderqtty': this.$t('sr0044.orderqtty'),
          'data.matchamtt': this.$t('sr0044.matchamtt'),
          'data.orderid': this.$t('sr0044.orderid'),
          'data.status': this.$t('sr0044.status'),
          'data.actype': this.$t('sr0044.actype'),
          'data.feeamc': this.$t('sr0044.feeamc'),
          'data.feedxx': this.$t('sr0044.feedxx'),
          'data.feefund': this.$t('sr0044.feefund'),
          'data.feetotal': this.$t('sr0044.feetotal'),
          'data.nav': this.$t('sr0044.nav'),
          'data.totalnav': this.$t('sr0044.totalnav'),
          'data.tradingdate': this.$t('sr0044.tradingdate'),
          'data.name': this.$t('sr0044.name'),
          'data.symbol': this.$t('sr0044.symbol'),
          'data.feename': this.$t('sr0044.feename'),
          'data.feeid': this.$t('sr0044.feeid'),
          status: this.$t('fileImport.Status'),
          warnings: this.$t('fileImport.Warnings'),
          errors: this.$t('fileImport.Errors')
        },
        filterByColumn: true,
        sortable: [],
        perPage: 25,
        requestFunction (data) {
          data.file_import_id = this.$route.params.id
          return callApiFileImportLine(this, data).then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  watch: {
    file_import (value) {
      this.$refs.modal.setData(value.processed_line, value.total_line)
    }
  },
  async created () {
    this.status = await callApiFileImportGetLineStatus(this)
  },
  mounted () {
    this.$refs.modal.show()
    this._checkStatusFileImport()
  },
  methods: {
    async importTransactionFund (id) {
      const result = await callApiTransactionFundImport(this, { file_import_id: this.$route.params.id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Import Success'),
          message: this.$t('common.Import Success')
        })
        this.$router.push(this.localePath('/transaction-fund'))
      } else {
        this.flashMessage.error({
          title: this.$t('common.Import Error'),
          message: result.message
        })
      }
    },
    async _checkStatusFileImport () {
      const data = await callApiFileImportDetail(this, { file_import_id: this.$route.params.id })
      if (data.status === true) {
        this.file_import = data.response
        if (this.file_import.status !== 3) {
          setTimeout(() => this._checkStatusFileImport(), 1000)
        } else {
          this.$refs.modal.hide()
        }
      } else {
        this.$refs.modal.hide()
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
