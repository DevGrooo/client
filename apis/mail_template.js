import { put } from '@/untils/api'

export function callApiMailTemplateGetList (context, params = {}) {
    return put('/mail_template/list', params, context)
}

export function callApiMailTemplateGetGetList (context, params = {}) {
    return put('/mail_template/get_list', params, context)
}

export function callApiMailTemplateGetDetail (context, params = {}) {
    return put('/mail_template/detail', params, context)
}
