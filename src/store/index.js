import Vuex from 'vuex'
import Vue from 'vue'
import twoots from './modules/twoots'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    twoots,
  }
})