import { put } from '@/untils/api'

export function callApiMailTemplateLocaleGetList (context, params = {}) {
    return put('/mail_template_locale/list', params, context)
}

export function callApiMailTemplateLocaleCreate (context, params = {}) {
    return put('/mail_template_locale/create', params, context)
}

export function callApiMailTemplateLocaleDetail (context, params = {}) {
    return put('/mail_template_locale/detail', params, context)
}

export function callApiMailTemplateLocaleUpdate (context, params = {}) {
    return put('/mail_template_locale/update', params, context)
}
