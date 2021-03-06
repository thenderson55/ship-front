import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import AllTwoots from './components/AllTwoots.vue'
import TwootsHome from './components/TwootsHome.vue'
import store from './store'
import Profile from './components/Profile.vue'
// import { LinkPlugin } from 'bootstrap-vue'

// Vue.use(LinkPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {path:'/', component: TwootsHome},
  {path:'/signup', component: SignUp},
  {path:'/login', component: LogIn},
  {path:'/alltwoots', component: AllTwoots},
  {path: '/profile/:id', name: 'profile', component: Profile, props: true }
]

const router =  new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// })

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
