import { put } from '@/untils/api'

export function callApiCommissionGetList (context, params = {}) {
    return put('/commission/list', params, context)
}
