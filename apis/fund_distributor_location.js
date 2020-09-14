import { put } from '@/untils/api'

export async function callApiFundDistributorLocationList (context, params = {}) {
    return await put('/fund_distributor_location/list', params, context)
}

export async function callApiFundDistributorLocationGetStatus (context, params = {}) {
    return await put('/fund_distributor_location/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiFundDistributorLocationLock (context, params = {}) {
    return put('/fund_distributor_location/lock', params, context)
}

export function callApiFundDistributorLocationActive (context, params = {}) {
    return put('/fund_distributor_location/active', params, context)
}

export function callApiFundDistributorLocationCreate (context, params = {}) {
    return put('/fund_distributor_location/create', params, context)
}

export function callApiFundDistributorLocationUpdate (context, params = {}) {
    return put('/fund_distributor_location/update', params, context)
}

export function callApiFundDistributorLocationDetail (context, params = {}) {
    return put('/fund_distributor_location/detail', params, context)
}
