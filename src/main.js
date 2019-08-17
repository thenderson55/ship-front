import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createProvider } from './vue-apollo'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import Home from './Home.vue'

Vue.use(VueRouter)
// Vue.use(ElementUI)
Vue.config.productionTip = false

const routes = [
  {path:'/', component: Home},
  {path:'/signup', component: SignUp},
  {path:'/login', component: LogIn},
]

const router =  new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
