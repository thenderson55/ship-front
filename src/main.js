import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import Home from './Home.vue'
import AllTwoots from './components/AllTwoots.vue'
import store from './store'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {path:'/', component: Home},
  {path:'/signup', component: SignUp},
  {path:'/login', component: LogIn},
  {path:'/alltwoots', component: AllTwoots}
]

const router =  new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
