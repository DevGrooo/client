import { put } from '@/untils/api'

export function callApiTradingFrequencyList (context, params = {}) {
  return put('/trading-frequency/list', params, context)
}
export function callApiTradingFrequencyCreate (context, params = {}) {
  return put('/trading-frequency/create', params, context)
}
export function callApiTradingFrequencyActive (context, params = {}) {
  return put('/trading-frequency/active', params, context)
}
export function callApiTradingFrequencyLock (context, params = {}) {
  return put('/trading-frequency/lock', params, context)
}
export async function callApiTradingFrequencyGetStatus (context, params = {}) {
  return await put('/trading-frequency/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
