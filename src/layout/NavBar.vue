<template>
  <div class="nav-bar" :key="componentKey">
    <ul class="nav justify-content-end">
      <li class="nav-item mr-auto">
        <router-link class="nav-link" to="/">Twotter</router-link>
      </li>
      <li class="nav-item ">
        <router-link  class="nav-link float-right" to="/">Home</router-link>
      </li>
      <li class="nav-item ">
        <router-link  class="nav-link float-right" to="/alltwoots">All Twoots</router-link>
      </li>
      <li class="nav-item " v-if="!showNav.bool" >
        <button  v-on:click="logOut" class="btn nav-link" to="/login">Log out</button >    
      </li>
      <li class="nav-item " v-if="showNav.bool">
        <router-link  class="nav-link float-right" to="/">Log in</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { onLogout } from '../vue-apollo'
console.log(localStorage.getItem('apollo-token'))

export default {
  data() {
    return {
      showNav: {bool:false},
      componentKey: 0,
    };
    isLoggedIn
  },
  // beforeCreate () {
  //   User.checkAuth() ? this.showNav = true : this.showNav = false
  //   console.log(this.showNav)
  // },
  computed:{
    ...mapGetters(['isLoggedIn'])
  }, 
  methods: {
    ...mapActions(['toggleLogin']),
    forceRerender() {
      this.componentKey += 1;  
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // toggle(){
    //   return !this.shoNav
    // },
    logOut() {
      onLogout(this.$apollo.provider.defaultClient)
      // this.toggleLogin()
      setTimeout(() => {
        localStorage.getItem('apollo-token') == null ? this.showNav.bool = true : this.showNav.bool = false
      }, 10)
      // this.forceRerender()
      this.$router.push('/login')
      console.log(localStorage.getItem('apollo-token'))

    },
    getLocalStorage (){
    console.log('get');
    return localStorage.getItem( 'apollo-token' );
  
    }
  }
}
</script>

<style scoped>
.nav-bar {
  margin-bottom: 40px;
}

.btn {
  color: #057bfb;
}

</style>
