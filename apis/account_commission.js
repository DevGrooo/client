import { put } from '@/untils/api'

export function callApiAccountCommissionGetList (context, params = {}) {
    return put('/account_commission/list', params, context)
}

export function callApiAccountCommissionLock (context, params = {}) {
    return put('/account_commission/lock', params, context)
}

export function callApiAccountCommissionActive (context, params = {}) {
    return put('/account_commission/active', params, context)
}
