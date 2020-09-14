import { put } from '@/untils/api'

export function callApiFundDistributorProductCreate (context, params = {}) {
    return put('/fund_distributor_product/create', params, context)
}

export function callApiFundDistributorProductUpdate (context, params = {}) {
    return put('/fund_distributor_product/update', params, context)
}

export function callApiFundDistributorProductDetail (context, params = {}) {
    return put('/fund_distributor_product/detail', params, context)
}

export async function callApiFundDistributorProductGetStatus (context, params = {}) {
    return await put('/fund_distributor_product/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiFundDistributorProductList (context, params = {}) {
    return put('/fund_distributor_product/list', params, context)
}

export function callApiFundDistributorProductLock (context, params = {}) {
    return put('/fund_distributor_product/lock', params, context)
}

export function callApiFundDistributorProductActive (context, params = {}) {
    return put('/fund_distributor_product/active', params, context)
}
