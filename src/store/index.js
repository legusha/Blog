import Vue from 'vue'
import Vuex from 'vuex'

import Posts from '@/store/posts'
import User from '@/store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Posts,
    User
  }
})
