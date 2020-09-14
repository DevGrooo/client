export const state = () => ({
  listFundProductTypes: [],
  selectedTest: {},
  FundProductTypeProfile: {}
})
export const mutations = {
  SET_LIST_FUND_PRODUCT_TYPE (state, listFundProductTypes) {
    state.listFundProductTypes = listFundProductTypes
  }
  // SET_SELECTED_TEST (state, selectedTest) {
  //   state.selectedTest = selectedTest
  // }
}
export const actions = {
  async getListFundProductType ({ commit }, query = {}) {
    try {
      const data = await this.$axios.$put('/fund_product_type/list', {
        params: query
      })
      commit('SET_LIST_FUND_PRODUCT_TYPE', data.data)

      data.data.map((item, index) => {
        item.index = index + 1
      })

      return {
        data: data.data,
        count: data.meta.total
      }
    } catch (error) {
      console.log('getListFundProductType error', error)
      return {
        data: [],
        count: 0
      }
    }
  }
}
