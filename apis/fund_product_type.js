import { put } from '@/untils/api'

export function callApiFundProductTypeList (context, params = {}) {
  return put('/fund_product_type/list', params, context)
}

export function callApiFundProductTypeCreate (context, params = {}) {
  return put('/fund_product_type/add', params, context)
}

export function callApiFundProductTypeDetail (context, params = {}) {
  return put('/fund_product_type/detail', params, context)
}

export function callApiFundProductTypeUpdate (context, params = {}) {
  return put('/fund_product_type/update', params, context)
}

export function callApiFundProductTypeLock (context, params = {}) {
  return put('/fund_product_type/lock', params, context)
}

export function callApiFundProductTypeActive (context, params = {}) {
  return put('/fund_product_type/active', params, context)
}

export async function callApiFundProductTypeGetList (context, params = {}) {
  return await put('/fund_product_type/get_list', params, context)
  .then((data) => {
      return data.response
  })
  .catch((err) => {
      console.log(process.server)
      console.log(err)
      return []
  })
}

export async function callApiFundProductTypeGetStatus (context, params = {}) {
  return await put('/fund_product_type/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
