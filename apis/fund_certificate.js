import { put } from '@/untils/api'

export async function callApiFundCertificateGetFundCompanyList (context, params = {}) {
    return await put('/fund_company/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiFundCertificateCreate (context, params = {}) {
    return put('/fund_certificate/add', params, context)
}

export function callApiFundCertificateDetail (context, params = {}) {
    return put('/fund_certificate/detail', params, context)
}

export function callApiFundCertificateUpdate (context, params = {}) {
    return put('/fund_certificate/update', params, context)
}

export async function callApiFundCertificateGetList (context, params = {}) {
  return await put('/fund_certificate/get_list', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiFundCertificateGetFundProduct (context, params = {}) {
  return await put('/fund_certificate/get_fund_product', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiFundCertificateGetListByFundDistributorProduct (context, params = {}) {
  return await put('/fund_certificate/get_list_by_fund_distributor_product', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
