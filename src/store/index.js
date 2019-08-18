import Vuex from 'vuex'
import Vue from 'vue'
import tweets from './modules/tweets'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tweets,
    user
  }
})