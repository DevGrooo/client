import { put } from '@/untils/api'

export async function callApiFundCompanyGetList (context, params = {}) {
    return await put('/fund_company/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}
