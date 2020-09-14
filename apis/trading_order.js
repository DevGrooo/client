import { put } from '@/untils/api'

export async function callApiTradingOrderGetList (context, params = {}) {
  return await put('/trading_order/get_list', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiTradingOrderList (context, params = {}) {
    return await put('/trading_order/list', params, context)
}

export async function callApiTradingOrderCreate (context, params = {}) {
  return await put('/trading_order/create', params, context)
}

export async function callApiTradingOrderGetStatusBuyOrSell (context, params = {}) {
  return await put('/trading_order/get_status_buy_or_sell', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
