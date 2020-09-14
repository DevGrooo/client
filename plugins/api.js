import Api from '@/untils/api'

export default (context, inject) => {
    const api = new Api(context)
    inject('api', api)
    context.$api = api
}
