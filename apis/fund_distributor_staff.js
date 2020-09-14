import { put } from '@/untils/api'

export async function callApiFundDistributorStaffList (context, params = {}) {
    return await put('/fund_distributor_staff/list', params, context)
}

export async function callApiFundDistributorStaffGetStatus (context, params = {}) {
    return await put('/fund_distributor_staff/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiFundDistributorStaffLock (context, params = {}) {
    return put('/fund_distributor_staff/lock', params, context)
}

export function callApiFundDistributorStaffActive (context, params = {}) {
    return put('/fund_distributor_staff/active', params, context)
}

export function callApiFundDistributorStaffCreate (context, params = {}) {
    return put('/fund_distributor_staff/create', params, context)
}

export function callApiFundDistributorStaffUpdate (context, params = {}) {
    return put('/fund_distributor_staff/update', params, context)
}

export function callApiFundDistributorStaffDetail (context, params = {}) {
    return put('/fund_distributor_staff/detail', params, context)
}

export async function callApiFundDistributorStaffGetList (context, params = {}) {
    return await put('/fund_distributor_staff/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch((err) => {
        console.log(process.server)
        console.log(err)
        return []
    })
}
