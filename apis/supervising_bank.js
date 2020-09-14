import { put } from '@/untils/api'

export async function callApiSupervisingBankGetList (context, params = {}) {
    return await put('/supervising_bank/get_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}
