import { createStore } from 'vuex'

import userInfo from './module/user-info'
import navList from './module/nav-list'

const store = createStore({
  modules: {
    userInfo,
    navList
  }
})

export default store
