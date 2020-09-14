import { put } from '@/untils/api'

export function callApiInvestorSipList (context, params = {}) {
  return put('/investor_sip/list', params, context)
}

export async function callApiGetSipType (context, params = {}) {
  return await put('/investor_sip/get_sip_type', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiInvestorSipCreate (context, params = {}) {
  return await put('/investor_sip/create', params, context)
}

export async function callApiInvestorSipDetail (context, params = {}) {
  return await put('/investor_sip/detail', params, context)
}

export async function callApiInvestorSipUpdate (context, params = {}) {
  return await put('/investor_sip/update', params, context)
}
