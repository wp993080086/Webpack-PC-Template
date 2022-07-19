import { Module } from 'vuex'
import { IMenu, IPaths } from './nav'

export interface navState {
  isCollapse: boolean
  menu: Array<IMenu>
  paths: Array<IPaths> | Array<void>
}

const Nav: Module<navState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    isCollapse: false,
    menu: [],
    paths: []
  },
  getters: {
    getIsCollapse(state: navState) {
      return state.isCollapse
    },
    getPaths(state: navState) {
      return state.paths
    }
  },
  mutations: {
    // 收缩菜单栏
    handleChangeCollapse(state: navState) {
      state.isCollapse = !state.isCollapse
    },
    // 修改面包屑
    handleChangePaths(state: navState, value: Array<IPaths>) {
      state.paths = []
      state.paths = value
    }
  },
  actions: {}
}

export default Nav
