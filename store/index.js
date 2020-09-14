// import axios from 'axios'
// import { getDataRequest } from '@/untils/api'

export const state = () => ({
  globalErrors: [],
  currentURL: null,
  profile: null
})

export const mutations = {
  SET_GLOBAL_ERRORS (state, errors) {
    state.globalErrors = errors
  },
  SET_CURRENT_URL (state, curentURL) {
    state.currentURL = curentURL
  },
  SET_PROFILE (state, profile) {
    state.profile = profile
    return profile
  }
}

export const actions = {
  setError ({ commit }, errors) {
    commit('SET_GLOBAL_ERRORS', errors)
  }
  // async nuxtServerInit ({ dispatch, commit, state }, context) {
  //   if (state.auth.loggedIn === true) {
  //     const request = getDataRequest({}, context.store, context.app.$auth)
  //     const data = await context.$axios.put(process.env.API_BASE_URL + '/user/profile', request)
  //     if (data) {
  //       commit('SET_PROFILE', data)
  //     }
  //   }
  // }
}
