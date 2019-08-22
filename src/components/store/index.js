import Vuex from 'vuex'
import Vue from 'vue'
import twoots from './modules/twoots'
import signin from './modules/signin'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    twoots,
    signin
  }
})