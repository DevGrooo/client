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
              <button class="btn btn-primary btn-wd" @click="importInvestor">Import</button>
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
import { callApiInvestorImport } from '@/apis/investor'
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
        'data.dbcode',
        'data.custodycd',
        'data.acctype',
        'data.fullname',
        'data.idtype',
        'data.idcode',
        'data.iddate',
        'data.idplace',
        'data.birthdate',
        'data.sex',
        'data.country',
        'data.taxno',
        'data.regaddress',
        'data.address',
        'data.phone',
        'data.fax',
        'data.email',
        'data.investtype',
        'data.custtype',
        'data.grinvestor',
        'data.bankacc',
        'data.bankcode',
        'data.citybank',
        'data.description',
        'data.refname1',
        'data.refpost1',
        'data.refidcode1',
        'data.refiddate1',
        'data.refidplace1',
        'data.refcountry1',
        'data.refmobile1',
        'data.refaddress1',
        'data.authname',
        'data.authidcode',
        'data.authiddate',
        'data.authidplace',
        'data.authphone',
        'data.authaddress',
        'data.authefdate',
        'data.authexdate',
        'data.linkauth',
        'data.recode',
        'data.symbols',
        'data.fatca1',
        'data.fatca2',
        'data.fatca3',
        'data.fatca4',
        'data.fatca5',
        'data.fatca6',
        'data.fatca7',
        'status',
        'warnings',
        'errors'
      ],
      options: {
        headings: {
          id: this.$t('fileImport.Id'),
          'data.dbcode': this.$t('fileImport.dbcode'),
          'data.custodycd': this.$t('fileImport.custodycd'),
          'data.acctype': this.$t('fileImport.acctype'),
          'data.fullname': this.$t('fileImport.fullname'),
          'data.idtype': this.$t('fileImport.idtype'),
          'data.idcode': this.$t('fileImport.idcode'),
          'data.iddate': this.$t('fileImport.iddate'),
          'data.idplace': this.$t('fileImport.idplace'),
          'data.birthdate': this.$t('fileImport.birthdate'),
          'data.sex': this.$t('fileImport.sex'),
          'data.country': this.$t('fileImport.country'),
          'data.taxno': this.$t('fileImport.taxno'),
          'data.regaddress': this.$t('fileImport.regaddress'),
          'data.address': this.$t('fileImport.address'),
          'data.phone': this.$t('fileImport.phone'),
          'data.fax': this.$t('fileImport.fax'),
          'data.email': this.$t('fileImport.email'),
          'data.investtype': this.$t('fileImport.investtype'),
          'data.custtype': this.$t('fileImport.custtype'),
          'data.grinvestor': this.$t('fileImport.grinvestor'),
          'data.bankacc': this.$t('fileImport.bankacc'),
          'data.bankcode': this.$t('fileImport.bankcode'),
          'data.citybank': this.$t('fileImport.citybank'),
          'data.description': this.$t('fileImport.description'),
          'data.refname1': this.$t('fileImport.refname1'),
          'data.refpost1': this.$t('fileImport.refpost1'),
          'data.refidcode1': this.$t('fileImport.refidcode1'),
          'data.refiddate1': this.$t('fileImport.refiddate1'),
          'data.refidplace1': this.$t('fileImport.refidplace1'),
          'data.refcountry1': this.$t('fileImport.refcountry1'),
          'data.refmobile1': this.$t('fileImport.refmobile1'),
          'data.refaddress1': this.$t('fileImport.refaddress1'),
          'data.authname': this.$t('fileImport.authname'),
          'data.authidcode': this.$t('fileImport.authidcode'),
          'data.authiddate': this.$t('fileImport.authiddate'),
          'data.authidplace': this.$t('fileImport.authidplace'),
          'data.authphone': this.$t('fileImport.authphone'),
          'data.authaddress': this.$t('fileImport.authaddress'),
          'data.authefdate': this.$t('fileImport.authefdate'),
          'data.authexdate': this.$t('fileImport.authexdate'),
          'data.linkauth': this.$t('fileImport.linkauth'),
          'data.recode': this.$t('fileImport.recode'),
          'data.symbols': this.$t('fileImport.symbols'),
          'data.fatca1': this.$t('fileImport.fatca1'),
          'data.fatca2': this.$t('fileImport.fatca2'),
          'data.fatca3': this.$t('fileImport.fatca3'),
          'data.fatca4': this.$t('fileImport.fatca4'),
          'data.fatca5': this.$t('fileImport.fatca5'),
          'data.fatca6': this.$t('fileImport.fatca6'),
          'data.fatca7': this.$t('fileImport.fatca7'),
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
    async importInvestor (id) {
      const result = await callApiInvestorImport(this, { file_import_id: this.file_import.id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Import Success'),
          message: this.$t('common.Import Success')
        })
        this.$router.push(this.localePath('/investor'))
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
