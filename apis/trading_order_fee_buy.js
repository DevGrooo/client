import { put } from '~/untils/api.js'

export async function callApiTradingOrderFeeBuyList (context, params = {}) {
  return await put('/trading_order_fee_buy/list', params, context)
}

export async function callApiTradingOrderFeeBuyCreate (context, params = {}) {
  return await put('/trading_order_fee_buy/create', params, context)
}

export async function callApiTradingOrderFeeBuyLock (context, params = {}) {
  return await put('/trading_order_fee_buy/lock', params, context)
}

export async function callApiTradingOrderFeeBuyGetStatus (context, params = {}) {
  return await put('/trading_order_fee_sell/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
