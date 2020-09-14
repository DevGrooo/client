import { put } from '@/untils/api'

export async function callApiReferralBankList (context, params = {}) {
  return await put('/referral-bank/list', params, context)
}
export async function callApiReferralBankCreate (context, params = {}) {
  return await put('/referral-bank/create', params, context)
}

export async function callApiReferralBankDetail (context, params = {}) {
  return await put('/referral-bank/detail', params, context)
}

export async function callApiReferralBankUpdate (context, params = {}) {
  return await put('/referral-bank/update', params, context)
}

export async function callApiReferralBankLock (context, params = {}) {
  return await put('/referral-bank/lock', params, context)
}

export async function callApiReferralBankActive (context, params = {}) {
  return await put('/referral-bank/active', params, context)
}

export async function callApiReferralBankGetStatus (context, params = {}) {
  return await put('/referral-bank/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
