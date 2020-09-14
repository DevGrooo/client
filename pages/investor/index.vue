<template>
  <div>
    <v-server-table
      ref="vuetable"
      url=""
      :columns="columns"
      :options="options"
      @sorted="sorted"
    >
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary'}" role="/investor/import-file-excel" @onClick="$refs.modal.show()">
            {{ $t('investor.Import file excel') }}
          </role-button>
          <role-button :props="{class: 'btn btn-primary'}" role="/investor/create" to="/investor/create">
            {{ $t('investor.Create Investor') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-2">
              <input v-model="filters.name" :placeholder="$t('investor.Name')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <input v-model="filters.id_number" :placeholder="$t('investor.ID Number')" type="text" class="form-control" />
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.status.value" :placeholder="$t('investor.Status')" class="form-control">
                <option value="">{{ $t('investor.All Status') }}</option>
                <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.vsd_status.value" :placeholder="$t('investor.VSD Status')" class="form-control">
                <option value="">{{ $t('investor.All VSD Status') }}</option>
                <option v-for="(item, index) in vsd_status" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <select v-model="filters.fund_distributor_id" :placeholder="$t('investor.Distributor Name')" class="form-control">
                <option value="">{{ $t('investor.All Fund Distributor') }}</option>
                <option v-for="(item, index) in fund_distributors" :key="index" :value="item.value">{{ item.title }}</option>
              </select>
            </div>
            <div class="col-md-2 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('investor.Search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="fund_distributor_name" slot-scope="props" style="min-width: 180px;">
        {{ props.row.fund_distributor_name }}
      </div>
      <div slot="name" slot-scope="props" style="min-width: 250px;">
        {{ props.row.name }}
      </div>
      <div slot="bank.name" slot-scope="props" style="min-width: 180px;">
        {{ props.row.bank.name }}
      </div>
      <div slot="scale_type_name" slot-scope="props" class="text-center" style="min-width: 100px;">
        {{ props.row.scale_type_name }}
      </div>
      <div slot="gender_name" slot-scope="props" class="text-center">
        {{ props.row.gender_name }}
      </div>
      <div slot="branch" slot-scope="props" style="min-width: 120px;">
        {{ props.row.branch }}
      </div>
      <div slot="account_number" slot-scope="props" style="min-width: 120px;">
        {{ props.row.account_number }}
      </div>
      <div slot="permanent_address" slot-scope="props" style="min-width: 200px;">
        {{ props.row.permanent_address }}
      </div>
      <div slot="id_issuing_place" slot-scope="props" style="min-width: 180px;">
        {{ props.row.id_issuing_place }}
      </div>
      <div slot="phone" slot-scope="props" style="min-width: 120px;">
        {{ props.row.phone }}
      </div>
      <div slot="status" slot-scope="props" class="text-center" style="min-width: 100px;">
        <span v-if="props.row.status === 1">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-primary">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 3" class="text-danger">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 4" class="text-warning">{{ props.row.status_name }}</span>
      </div>
      <div slot="vsd_status" slot-scope="props" class="text-center" style="min-width: 100px;">
        <span v-if="props.row.vsd_status === 1">{{ props.row.vsd_status_name }}</span>
        <span v-if="props.row.vsd_status === 2" class="text-primary">{{ props.row.vsd_status_name }}</span>
        <span v-if="props.row.vsd_status === 3" class="text-danger">{{ props.row.vsd_status_name }}</span>
        <span v-if="props.row.vsd_status === 4" class="text-success">{{ props.row.vsd_status_name }}</span>
      </div>
      <template slot="checkbox" slot-scope="props">
        <input v-model="ids" :value="props.row.id" type="checkbox" />
      </template>
      <template slot="h__checkbox">
        <input v-model="checkedAll" type="checkbox" @click="onCheckAll($event.target.checked)" />
      </template>
      <div slot="action" slot-scope="props" style="min-width: 100px;">
        <role-button
          v-if="props.row.actions.includes('update')"
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/investor/update"
          :to="`/investor/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('cancel')"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: 'Bạn muốn hủy tài khoản nhà đầu tư này?'}"
          role="/investor/cancel"
          @onClick="cancel(props.row.id)"
        >
          <i class="fa fa-trash"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('closed')"
          :props="{class: 'btn btn-link btn-warning table-action edit', confirmText: 'Bạn muốn đóng tài khoản nhà đầu tư này?'}"
          role="/investor/closed"
          @onClick="closed(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('reopen')"
          :props="{class: 'btn btn-link btn-info table-action edit', confirmText: 'Bạn muốn mở lại tài khoản nhà đầu tư này?'}"
          role="/investor/reopen"
          @onClick="reopen(props.row.id)"
        >
          <i class="fa fa-unlock"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('active')"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: 'Bạn muốn kích hoạt tài khoản nhà đầu tư này?'}"
          role="/investor/active"
          @onClick="active(props.row.id)"
        >
          <i class="fa fa-check-square-o"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('reject')"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: 'Bạn muốn từ chối kích hoạt tài khoản nhà đầu tư này?'}"
          role="/investor/reject"
          @onClick="reject(props.row.id)"
        >
          <i class="fa fa-ban"></i>
        </role-button>
        <role-button
          v-if="props.row.actions.includes('send-mail')"
          :props="{class: 'btn btn-link btn-success table-action edit'}"
          role="/investor/send-mail"
          @onClick="sendMail(props.row.id)"
        >
          <i class="fa fa-envelope-o"></i>
        </role-button>
      </div>
    </v-server-table>
    <export-button
      ref="exportVSD"
      role="/investor/export-file-excel"
      :disabled="ids.length === 0"
      :props="{class: ids.length > 0 ? 'btn btn-primary' : 'btn btn-default'}"
      @onClick="exportVSD"
    >
      {{ $t('investor.Export VSD') }}
    </export-button>
    <export-button
      ref="export"
      role="/investor/export-file-excel"
      :props="{class: 'btn btn-primary'}"
      @onClick="exportFileExcel"
    >
      {{ $t('investor.Export file excel') }}
    </export-button>
    <modal-upload
      ref="modal"
      header="Import file excel"
      file-title="File excel"
      file-accept=".xls, .xlsx, .csv"
      button-title="Import"
      validate-require-message="File excel is required"
      @onUpload="importFileExcel"
    />
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import ExportButton from '@/components/UI/form/ExportButton'
import ModalUpload from '@/components/UI/modal/ModalUpload'
import {
  callApiInvestorList,
  callApiInvestorCancel,
  callApiInvestorClosed,
  callApiInvestorReopen,
  callApiInvestorGetStatus,
  callApiInvestorGetVsdStatus,
  callApiInvestorReject,
  callApiInvestorActive,
  callApiInvestorImportFileExcel,
  callApiInvestorExportFileExcel,
  callApiInvestorExportVSD
} from '@/apis/investor'
import { callApiFundDistributorGetList } from '@/apis/fund_distributor'
export default {
  name: 'InvestorList',
  components: {
    RoleButton,
    ExportButton,
    ModalUpload
  },
  data () {
    return {
      filters: {
        name: '',
        id_number: '',
        status: {
          compare: '=',
          value: ''
        },
        vsd_status: {
          compare: '=',
          value: ''
        },
        fund_distributor_id: ''
      },
      ids: [],
      checkedAll: false,
      sort: null,
      fund_distributors: [],
      status: [],
      vsd_status: [],
      columns: [
        'checkbox',
        'id',
        'fund_distributor_name',
        'name',
        'trading_account_number',
        'id_number',
        'account_number',
        'bank.name',
        'branch',
        'scale_type_name',
        'gender_name',
        'id_issuing_place',
        'id_issuing_date',
        'permanent_address',
        'phone',
        'email',
        'status',
        'vsd_status',
        'action'
      ],
      options: {
        headings: {
          id: this.$t('investor.Id'),
          fund_distributor_name: this.$t('investor.Distributor Name'),
          name: this.$t('investor.Name'),
          trading_account_number: this.$t('investor.Trading Account Number'),
          id_number: this.$t('investor.ID Number'),
          account_number: this.$t('investor.Account Number'),
          'bank.name': this.$t('investor.Bank'),
          branch: this.$t('investor.Branch'),
          scale_type_name: this.$t('investor.Scale Type'),
          gender_name: this.$t('investor.Gender'),
          id_issuing_place: this.$t('investor.ID Issuing Place'),
          id_issuing_date: this.$t('investor.ID Issuing Date'),
          permanent_address: this.$t('investor.Permanent Address'),
          phone: this.$t('investor.Phone'),
          emai: this.$t('investor.Email'),
          status: this.$t('investor.Status'),
          vsd_status: this.$t('investor.VSD Status'),
          action: this.$t('common.action')
        },
        filterByColumn: true,
        sortable: ['name', 'id_number'],
        requestFunction (data) {
          return callApiInvestorList(this, data)
          .then(function (data) {
            const rows = data.response
            for (let i = 0; i < rows.length; i++) {
              rows[i].checked = false
            }
            return rows
          })
        }
      }
    }
  },
  watch: {
    ids (value) {
      if (value.length >= this.$refs.vuetable.data.length) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
    }
  },
  async created () {
    this.fund_distributors = await callApiFundDistributorGetList(this)
    this.status = await callApiInvestorGetStatus(this)
    this.vsd_status = await callApiInvestorGetVsdStatus(this)
  },
  methods: {
    async cancel (id) {
      const result = await callApiInvestorCancel(this, { investor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor.Cancel Success'),
          message: this.$t('investor.Cancel investor success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor.Cancel Error'),
          message: result.message
        })
      }
    },
    async closed (id) {
      const result = await callApiInvestorClosed(this, { investor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor.Closed Success'),
          message: this.$t('investor.Closed investor success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor.Closed Error'),
          message: result.message
        })
      }
    },
    async reopen (id) {
      const result = await callApiInvestorReopen(this, { investor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor.Reopen Success'),
          message: this.$t('investor.Reopen investor success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor.Reopen Error'),
          message: result.message
        })
      }
    },
    async reject (id) {
      const result = await callApiInvestorReject(this, { investor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor.Reject Success'),
          message: this.$t('investor.Reject investor success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor.Reject Error'),
          message: result.message
        })
      }
    },
    async active (id) {
      const result = await callApiInvestorActive(this, { investor_id: id })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('investor.Active Success'),
          message: this.$t('investor.Active investor success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('investor.Active Error'),
          message: result.message
        })
      }
    },
    async importFileExcel (params) {
      const result = await callApiInvestorImportFileExcel(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('common.Upload Success'),
          message: this.$t('common.Upload Success')
        })
        this.$refs.modal.uploading = false
        this.$router.push(this.localePath('/investor/import/' + result.response.file_import_id))
        this.$refs.modal.hide()
      } else {
        this.flashMessage.error({
          title: this.$t('common.Upload Error'),
          message: result.message
        })
        this.$refs.modal.uploading = false
      }
    },
    async exportFileExcel () {
      const result = await callApiInvestorExportFileExcel(this, this._getParamsExport())
      if (result.status === true) {
        this.$refs.export.setData(result.response.file_data, result.response.file_name)
      } else {
        this.$refs.export.hideModal()
        this.flashMessage.error({
          title: this.$t('common.Export Error'),
          message: result.message
        })
      }
    },
    async exportVSD () {
      const result = await callApiInvestorExportVSD(this, this._getParamsExportVSD())
      if (result.status === true) {
        this.$refs.exportVSD.setData(result.response.file_data, result.response.file_name)
        this.$refs.vuetable.refresh()
      } else {
        this.$refs.exportVSD.hideModal()
        this.flashMessage.error({
          title: this.$t('common.Export Error'),
          message: result.message
        })
      }
    },
    _getParamsExport () {
      const params = {
        orderBy: '',
        ascending: 1,
        query: this.filters,
        byColumn: 1
      }
      if (this.sort !== null) {
        params.orderBy = this.sort.column
        params.ascending = this.sort.ascending ? 1 : 0
      }
      return params
    },
    _getParamsExportVSD () {
      const params = {
        orderBy: '',
        ascending: 1,
        query: {
          id: {
            compare: 'in',
            value: this.ids
          }
        },
        byColumn: 1
      }
      if (this.sort !== null) {
        params.orderBy = this.sort.column
        params.ascending = this.sort.ascending ? 1 : 0
      }
      return params
    },
    sorted (sort) {
      this.sort = sort
    },
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    },
    onCheckAll (checked) {
      this.ids = []
      if (checked) {
        const rows = this.$refs.vuetable.data
        for (let i = 0; i < rows.length; i++) {
          this.ids.push(rows[i].id)
        }
      }
    }
  }
}
</script>
