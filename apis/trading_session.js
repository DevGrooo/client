import { put } from '@/untils/api'

export function callApiTradingSessionList (context, params = {}) {
  return put('/trading-session/list', params, context)
}
export function callApiTradingSessionCancel (context, params = {}) {
  return put('/trading-session/cancel', params, context)
}
