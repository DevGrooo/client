import { put, putBase } from '@/untils/api'

export function callApiUserProfile (axios, token, locale) {
    return putBase(axios, '/user/profile', {}, token, locale)
}

export function callApiUserProfileChangePassword (context, params = {}) {
    return put('/user/profile_change_password', params, context)
}

export function callApiUserProfileUpdate (context, params = {}) {
    return put('/user/profile_update', params, context)
}

export function callApiUserGetList (context, params = {}) {
    return put('/user/list', params, context)
}

export function callApiUserDetail (context, params = {}) {
    return put('/user/detail', params, context)
}

export function callApiUserCreate (context, params = {}) {
    return put('/user/create', params, context)
}

export function callApiUserUpdate (context, params = {}) {
    return put('/user/update', params, context)
}

export function callApiUserUpdateRole (context, params = {}) {
    return put('/user/update_role', params, context)
}

export function callApiUserLock (context, params = {}) {
    return put('/user/lock', params, context)
}

export function callApiUserActive (context, params = {}) {
    return put('/user/active', params, context)
}

export function callApiUserResetPassword (context, params = {}) {
    return put('/user/reset_password', params, context)
}

export async function callApiUserGetStatus (context, params = {}) {
    return await put('/user/get_status', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}

export function callApiUserGetRefList (context, params = {}) {
    return put('/user/get_ref_list', params, context)
}

export async function callApiUserGetUserGroupList (context, params = {}) {
    return await put('/user/get_user_group_list', params, context)
    .then((data) => {
        return data.response
    })
    .catch(() => {
        return []
    })
}
