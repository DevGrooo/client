// import axios from 'axios'

export function getDataRequest (params, token, locale) {
    if (token) {
        return {
            env: process.env.APP_ENV,
            app_version: process.env.APP_VERSION,
            lang: locale,
            token,
            params
        }
    }
    return {
        env: process.env.APP_ENV,
        app_version: process.env.APP_VERSION,
        lang: locale,
        params
    }
}

export function getFormData (params, token, locale) {
    const data = getDataRequest(params, token, locale)
    const formData = new FormData()
    for (const key in data) {
        if (key === 'params') {
            for (const pKey in data[key]) {
                formData.append(key + '[' + pKey + ']', data[key][pKey])
            }
        } else {
            formData.append(key, data[key])
        }
    }
    return formData
}

function _getToken (auth) {
    if (typeof auth !== 'undefined' && auth.getToken('api')) {
        return auth.getToken('api')
    }
    return false
}

function _processResolve ({ data }) {
    if (data.status === true) {
        return data
    } else {
        return data
    }
}

export function putBase (axios, apiName, params, token, locale, config = {}) {
    return axios.put(process.env.API_BASE_URL + apiName, getDataRequest(params, token, locale), config)
}

export function postBase (axios, apiName, params, token, locale, config = {}) {
    return axios.post(process.env.API_BASE_URL + apiName, getFormData(params, token, locale), config)
}

export async function put (apiName, params, context) {
    const config = {}
    if (process.server) {
        // config.headers = {
        //     'Cache-Control': 'no-cache',
        //     Pragma: 'no-cache',
        //     Expires: '0'
        // }
    }
    return await putBase(context.$axios, apiName, params, _getToken(context.$auth), context.$i18n.locale, config)
    .then((res) => {
        return _processResolve(res)
    })
    // .catch(async function (error) {
    //     if (error.response) {
    //         console.log('api')
    //         if (parseInt(error.response.status) === 401) {
    //             await context.$auth.logout()
    //             context.$store.dispatch('setError', ['401'])
    //             context.redirect('/auth/login')
    //             return error.response.data
    //         } else if (parseInt(error.response.status) === 404) {
    //             return Promise.reject(error)
    //         } else {
    //             return error.response.data
    //         }
    //     }
    //     return Promise.reject(error)
    // })
}

export async function post (apiName, params, context, uploadFile = false) {
    const config = {}
    if (uploadFile) {
        config.headers = {
            'Content-Type': 'multipart/form-data'
        }
    }
    return await postBase(context.$axios, apiName, params, _getToken(context.$auth), context.$i18n.locale, config)
    // return await context.$axios.post(process.env.API_BASE_URL + apiName, getFormData(params, _getToken(context.$auth), context.$i18n.locale), config)
    .then((res) => {
        return _processResolve(res)
    })
    // .catch(async function (error) {
    //     if (error.response) {
    //         if (parseInt(error.response.status) === 401) {
    //             await context.$auth.logout()
    //             context.$store.dispatch('setError', ['401'])
    //             context.redirect('/auth/login')
    //             return error.response.data
    //         } else if (parseInt(error.response.status) === 404) {
    //             return Promise.reject(error)
    //         } else {
    //             return error.response.data
    //         }
    //     }
    //     return Promise.reject(error)
    // })
}

export default class Api {
    put (apiName, params) {
        return put(apiName, params, window.$nuxt)
    }

    post (apiName, params) {
        return post(apiName, params, window.$nuxt)
    }
}
