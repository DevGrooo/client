import { put } from '@/untils/api'

export function callApiFileImportDetail (context, params = {}) {
    return put('/file_import/detail', params, context, true)
}

export function callApiFileImportLine (context, params = {}) {
    return put('/file_import/line', params, context, true)
}

export async function callApiFileImportGetLineStatus (context, params = {}) {
    return await put('/file_import/get_line_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}
