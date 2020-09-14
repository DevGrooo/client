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
    listTests: [],
    selectedTest: {}
  })

  export const mutations = {
    SET_LIST_TESTS (state, listTests) {
      state.listTests = listTests
    },
    SET_SELECTED_TEST (state, selectedTest) {
      state.selectedTest = selectedTest
    }
  }

  export const actions = {
    async getListTests ({ commit }, query = {}) {
      try {
        const params = getParams(query, query.page, this.state.i18n.locale, this.$auth.getToken('api'))
        const data = await this.$axios.$get('/test', {
          params
        })
        commit('SET_LIST_TESTS', data.data)

        data.data.map((item, index) => {
          item.index = index + 1
        })

        return {
          data: data.data,
          count: data.meta.total
        }
      } catch (error) {
        console.log('getListTests error', error)
        return {
          data: [],
          count: 0
        }
      }
    },

    async createOrUpdateTest ({ commit }, test) {
      let savedTest = null
      try {
        if (test.id) {
          savedTest = await this.$axios.$put(
            `/test/${test.id}`,
            test
          )
        } else {
          savedTest = await this.$axios.$post(
            '/test',
            test
          )
        }

        commit('ADD_TEST_TO_LIST', savedTest)

        return savedTest.data
      } catch (error) {
        console.log('createOrUpdateTest error', error)
      }
    },

    async getSelectedTest ({ commit }, { testId }) {
      try {
        const data = await this.$axios.$get(`/test/${testId}`)

        commit('SET_SELECTED_TEST', data.data)

        return data.data
      } catch (error) {
        console.log('getSelectedTest error', error)
        return false
      }
    }
  }
