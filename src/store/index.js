import Vuex from 'vuex'
import Vue from 'vue'
import twoots from './modules/twoots'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    twoots,
    user
  }
})