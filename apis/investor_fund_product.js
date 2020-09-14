import { put } from '@/untils/api'

export async function callApiInvestorFundProductList (context, params = {}) {
  return await put('/investor_fund_product/list', params, context)
}

export async function callApiInvestorFundProductCreate (context, params = {}) {
  return await put('/investor_fund_product/create', params, context)
}

export async function callApiInvestorFundProductLock (context, params = {}) {
  return await put('/investor_fund_product/lock', params, context)
}

export async function callApiInvestorFundProductActive (context, params = {}) {
  return await put('/investor_fund_product/active', params, context)
}

export async function callApiInvestorFundProductgetStatus (context, params = {}) {
  return await put('/investor_fund_product/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}

export async function callApiInvestorFundProductgetFundProduct (context, params = {}) {
  return await put('/investor_fund_product/get_fund_product', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
