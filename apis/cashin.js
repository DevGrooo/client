import { put, post } from '@/untils/api'

export function callApiCashinList (context, params = {}) {
    return put('/cashin/list', params, context)
}

export function callApiCashinImportStatement (context, params = {}) {
    return post('/cashin/import_statement', params, context, true)
}

export async function callApiCashinGetStatus (context, params = {}) {
    return await put('/cashin/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiCashinDetail (context, params = {}) {
    return put('/cashin/detail', params, context)
}

export function callApiCashinUpdateInvestor (context, params = {}) {
    return put('/cashin/update_investor', params, context)
}
