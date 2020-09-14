import { put } from '@/untils/api'

export function callApiUserGroupList (context, params = {}) {
    return put('/user_group/list', params, context)
}

export function callApiUserGroupGetRoleList (context, params = {}) {
    return put('/user_group/get_role_list', params, context)
}
