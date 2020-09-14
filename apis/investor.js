import { put, post } from '@/untils/api'

export async function callApiInvestorGetList (context, params = {}) {
    return await put('/investor/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetStatus (context, params = {}) {
    return await put('/investor/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetVsdStatus (context, params = {}) {
    return await put('/investor/get_vsd_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetGenders (context, params = {}) {
    return await put('/investor/get_genders', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetIdTypes (context, params = {}) {
    return await put('/investor/get_id_types', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetScaleTypes (context, params = {}) {
    return await put('/investor/get_scale_types', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetInvestTypes (context, params = {}) {
    return await put('/investor/get_invest_types', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetZoneTypes (context, params = {}) {
    return await put('/investor/get_zone_types', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiInvestorGetTradingAccountTypes (context, params = {}) {
    return await put('/investor/get_trading_account_types', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiInvestorList (context, params = {}) {
    return put('/investor/list', params, context)
}

export function callApiInvestorCancel (context, params = {}) {
    return put('/investor/cancel', params, context)
}

export function callApiInvestorClosed (context, params = {}) {
    return put('/investor/closed', params, context)
}

export function callApiInvestorReopen (context, params = {}) {
    return put('/investor/reopen', params, context)
}

export function callApiInvestorCreate (context, params = {}) {
    return put('/investor/create', params, context)
}

export function callApiInvestorUpdate (context, params = {}) {
    return put('/investor/update', params, context)
}

export function callApiInvestorDetail (context, params = {}) {
    return put('/investor/detail', params, context)
}

export function callApiInvestorActive (context, params = {}) {
    return put('/investor/active', params, context)
}

export function callApiInvestorReject (context, params = {}) {
    return put('/investor/reject', params, context)
}

export function callApiInvestorImportFileExcel (context, params = {}) {
    return post('/investor/import_file_excel', params, context, true)
}

export function callApiInvestorExportFileExcel (context, params = {}) {
    return put('/investor/export_file_excel', params, context, true)
}

export function callApiInvestorExportVSD (context, params = {}) {
    return put('/investor/export_vsd', params, context, true)
}

export function callApiInvestorImport (context, params = {}) {
  return put('/investor/import', params, context, true)
}
export async function callApiInvestorGetListTradingAccountNumber (context, params = {}) {
  return await put('/investor/get_list_trading_account_number', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export function callApiGetListTradingAccountNumber (context, params = {}) {
  return put('/investor/get_list_trading_account_number', params, context, true)
}

export function callApiGetDetailAndSipProducts (context, params = {}) {
  return put('/investor/get_detail_and_sip_products', params, context, true)
}
