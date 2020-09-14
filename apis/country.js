import { put } from '@/untils/api'

export async function callApiCountryGetList (context, params = {}) {
    return await put('/country/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiCountryList (context, params = {}) {
  return put('/country/list', params, context)
}
export function callApiCountryCreate (context, params = {}) {
  return put('/country/add', params, context)
}
export function callApiCountryDetail (context, params = {}) {
  return put('/country/detail', params, context)
}
export function callApiCountryUpdate (context, params = {}) {
  return put('/country/update', params, context)
}
export function callApiCountryLock (context, params = {}) {
  return put('/country/lock', params, context)
}
export function callApiCountryActive (context, params = {}) {
  return put('/country/active', params, context)
}
export async function callApiCountryGetStatus (context, params = {}) {
  return await put('/country/get_status', params, context)
    .then((data) => {
      return data.response
    })
    .catch(() => {
      return []
    })
}
