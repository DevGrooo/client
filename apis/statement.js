import { put } from '@/untils/api'

export function callApiStatementDetail (context, params = {}) {
    return put('/statement/detail', params, context, true)
}

export function callApiStatementLine (context, params = {}) {
    return put('/statement/line', params, context, true)
}

export async function callApiStatementGetLineStatus (context, params = {}) {
    return await put('/statement/get_line_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}
