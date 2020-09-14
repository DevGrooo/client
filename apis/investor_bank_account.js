import { put } from '@/untils/api'

export async function callApiInvestorBankAccountList (context, params = {}) {
    return await put('/investor_bank_account/list', params, context)
}

export async function callApiInvestorBankAccountGetStatus (context, params = {}) {
    return await put('/investor_bank_account/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiInvestorBankAccountSetDefault (context, params = {}) {
    return put('/investor_bank_account/set_default', params, context)
}

export function callApiInvestorBankAccountLock (context, params = {}) {
    return put('/investor_bank_account/lock', params, context)
}

export function callApiInvestorBankAccountActive (context, params = {}) {
    return put('/investor_bank_account/active', params, context)
}

export function callApiInvestorBankAccountCreate (context, params = {}) {
    return put('/investor_bank_account/create', params, context)
}

export function callApiInvestorBankAccountDetail (context, params = {}) {
    return put('/investor_bank_account/detail', params, context)
}
