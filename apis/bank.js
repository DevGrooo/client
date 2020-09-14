import { put } from '@/untils/api'

export async function callApiBankGetList (context, params = {}) {
    return await put('/bank/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export async function callApiBankList (context, params = {}) {
    return await put('/bank/list', params, context)
}

export async function callApiBankCreate (context, params = {}) {
    return await put('/bank/create', params, context)
}

export async function callApiBankDetail (context, params = {}) {
    return await put('/bank/detail', params, context)
}

export async function callApiBankUpdate (context, params = {}) {
    return await put('/bank/update', params, context)
}

export async function callApiBankLock (context, params = {}) {
    return await put('/bank/lock', params, context)
}

export async function callApiBankActive (context, params = {}) {
    return await put('/bank/active', params, context)
}

export async function callApiBankGetStatus (context, params = {}) {
    return await put('/bank/get_status', params, context)
      .then((data) => {
        return data.response
      })
      .catch(() => {
        return []
      })
}
