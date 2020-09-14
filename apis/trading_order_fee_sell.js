import { put } from '~/untils/api'

export async function callApiTradingOrderFeeSellList (context, params = {}) {
  return await put('/trading_order_fee_sell/list', params, context)
}

export async function callApiTradingOrderFeeSellCreate (context, params = {}) {
  return await put('/trading_order_fee_sell/create', params, context)
}

export async function callApiTradingOrderFeeSellLock (context, params = {}) {
  return await put('/trading_order_fee_sell/lock', params, context)
}

export async function callApiTradingOrderFeeSellGetStatus (context, params = {}) {
  return await put('/trading_order_fee_sell/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
