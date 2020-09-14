import { put } from '@/untils/api'

export function callApiFundProductCreate (context, params = {}) {
    return put('/fund_product/add', params, context)
}
export function callApiFundProductUpdate (context, params = {}) {
  return put('/fund_product/update', params, context)
}
export function callApiFundProductList (context, params = {}) {
  return put('/fund_product/list', params, context)
}
export function callApiFundProductDetail (context, params = {}) {
  return put('/fund_product/detail', params, context)
}
export function callApiFundProductLock (context, params = {}) {
  return put('/fund_product/lock', params, context)
}
export function callApiFundProductActive (context, params = {}) {
  return put('/fund_product/active', params, context)
}
export async function callApiFundProductStatus (context, params = {}) {
  return await put('/fund_product/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiFundProductGetList (context, params = {}) {
  return await put('/fund_product/get_list', params, context)
  .then((data) => {
      return data.response
  })
  .catch(() => {
      return []
  })
}
