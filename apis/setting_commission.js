import { put } from '@/untils/api'

export function callApiSettingCommissionGetList (context, params = {}) {
    return put('/setting_commission/list', params, context)
}

export function callApiSettingCommissionDetail (context, params = {}) {
    return put('/setting_commission/detail', params, context)
}

export function callApiSettingCommissionCreate (context, params = {}) {
    return put('/setting_commission/create', params, context)
}

export function callApiSettingCommissionGetListFundDistributor (context, params = {}) {
    return put('/setting_commission/getListFundDistributor', params, context)
}
