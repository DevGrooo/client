import {
  callApiUserProfile
} from '@/apis/user'

export const state = () => ({
  myProfile: {},
  menus: []
})

export const mutations = {
  SET_MY_PROFILE (state, myProfile) {
    state.myProfile = myProfile
    return myProfile
  },
  SET_MENU_ITEM_ACTIVE (state, { itemIndex, subItemIndex }) {
    for (let i = 0; i < state.menus.length; i++) {
      state.menus[i].active = i === itemIndex
      for (let j = 0; j < state.menus[i].subItems.length; j++) {
        state.menus[i].subItems[j].active = (i === itemIndex && j === subItemIndex)
      }
    }
  },
  SET_MENU (state, roleGroups) {
    if (roleGroups) {
      const menus = []
      const oldMenus = state.menus
      for (let i = 0; i < roleGroups.length; i++) {
        menus[i] = {
          name: roleGroups[i].name,
          path: '',
          active: oldMenus.length > 0 ? oldMenus[i].active : false,
          code: roleGroups[i].data,
          subItems: []
        }
        const roles = roleGroups[i].roles
        let index = 0
        for (let j = 0; j < roles.length; j++) {
          if (parseInt(roles[j].publish) === 1) {
            menus[i].subItems[index] = {
              name: roles[j].name,
              path: roles[j].code,
              active: oldMenus.length > 0 ? oldMenus[i].subItems[index].active : false
            }
            index++
          }
        }
      }
      state.menus = menus
    }
  }
}

export const actions = {
  async setMyProfile ({ commit }, { axios, token, locale }) {
    const { data } = await callApiUserProfile(axios, token, locale)
    if (data && data.status === true) {
      commit('SET_MENU', data.response.role_groups)
      return commit('SET_MY_PROFILE', data.response)
    }
    return null
  }
}
