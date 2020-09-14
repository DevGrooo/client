export function getParams (params, page = 1, lang = 'vi', token = null) {
  return {
    params,
    page,
    lang,
    token,
    env: process.env.APP_ENV,
    app_version: process.env.APP_VERSION
  }
}

export const state = () => ({
  listFundCertificates: [],
  selectedFundCertificate: {}
})

export const mutations = {
  SET_LIST_FUND_CERTIFICATES (state, listFundCertificates) {
    state.listFundCertificates = listFundCertificates
  },
  SET_SELECTED_FUND_CERTIFICATE (state, selectedFundCertificate) {
    state.selectedFundCertificate = selectedFundCertificate
  },
  LOCK_OR_ACTIVE_FUND_CERTIFICATE (state, newFundCertificate) {
    console.log('LOCK_OR_ACTIVE_FUND_CERTIFICATE', newFundCertificate)
    const fundCertificate = state.listFundCertificates.find(item => item.id === newFundCertificate.id)
    if (fundCertificate) {
      const index = state.listFundCertificates.findIndex(
        item => item.id === newFundCertificate.id
      )
      newFundCertificate.index = index + 1
      newFundCertificate.created_at = fundCertificate.created_at.slice(0, 10)
      newFundCertificate.updated_at = fundCertificate.updated_at.slice(0, 10)
      state.listFundCertificates.splice(index, 1, newFundCertificate)
    }
  }
}

export const actions = {
  async getListFundCertificates ({ commit }, query = {}) {
    try {
      const params = getParams(query, query.page, this.state.i18n.locale, this.$auth.getToken('api'))
      const data = await this.$axios.$get('/fund_certificate/list', {
        params
      })

      data.data.map((item, index) => {
        item.created_at = item.created_at.slice(0, 10)
        item.updated_at = item.updated_at.slice(0, 10)
        item.index = index + 1
      })

      commit('SET_LIST_FUND_CERTIFICATES', data.data)

      return {
        data: data.data,
        count: data.meta.total
      }
    } catch (error) {
      console.log('getListFundCertificates error', error)
      return {
        data: [],
        count: 0
      }
    }
  },
  async lockOrActiveFundCertificate ({ commit }, fundCertificate) {
    let savedFundCertificate = null
    try {
      const params = {
        env: process.env.APP_ENV,
        lang: this.state.i18n.locale,
        token: this.$auth.getToken('api'),
        app_version: process.env.APP_VERSION,
        params: { fund_certificate_id: fundCertificate.id }
      }
      if (fundCertificate.flag) {
        console.log('AAAAAAAAAA')
        savedFundCertificate = await this.$axios.$put(
          '/fund_certificate/lock',
          params
        )
      } else {
        savedFundCertificate = await this.$axios.$put(
          '/fund_certificate/active',
          params
        )
      }

      commit('LOCK_OR_ACTIVE_FUND_CERTIFICATE', savedFundCertificate.response)
    } catch (error) {
      console.log('lockOrActiveFundCertificate error', error)
      return false
    }
  }
}
