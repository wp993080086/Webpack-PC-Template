import { Module } from 'vuex'
import { IUserState, TUser, TDetails } from './user'

const LoginStore: Module<IUserState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    userInfo: {},
    userDetails: {}
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, payload: TUser) {
      state.userInfo = payload
    },
    // 设置用户详情
    setUserDetails(state, payload: TDetails) {
      state.userDetails = payload
    }
  },
  actions: {
    // 异步设置用户信息
    syncSetUserInfo({ commit }, payload: TUser) {
      commit('setUserInfo', payload)
    }
  }
}

export default LoginStore
