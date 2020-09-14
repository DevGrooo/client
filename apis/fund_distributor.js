import { put } from '@/untils/api'

export function callApiFundDistributorCreate (context, params = {}) {
    return put('/fund_distributor/create', params, context)
}

export function callApiFundDistributorUpdate (context, params = {}) {
    return put('/fund_distributor/update', params, context)
}

export function callApiFundDistributorDetail (context, params = {}) {
    return put('/fund_distributor/detail', params, context)
}

export async function callApiFundDistributorGetStatus (context, params = {}) {
    return await put('/fund_distributor/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiFundDistributorList (context, params = {}) {
    return put('/fund_distributor/list', params, context)
}

export function callApiFundDistributorLock (context, params = {}) {
    return put('/fund_distributor/lock', params, context)
}

export function callApiFundDistributorActive (context, params = {}) {
    return put('/fund_distributor/active', params, context)
}

export async function callApiFundDistributorGetList (context, params = {}) {
    return await put('/fund_distributor/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch((err) => {
        console.log(process.server)
        console.log(err)
        return []
    })
}

export async function callApiFundDistributorGetListCode (context, params = {}) {
    return await put('/fund_distributor/get_list_code', params, context)
    .then((data) => {
        return data.response
    })
    .catch((err) => {
        console.log(process.server)
        console.log(err)
        return []
    })
}
