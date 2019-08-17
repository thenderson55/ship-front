<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Twoots/> -->
    <router-view></router-view>
    <!-- <SignUp/> -->
    <!-- <CreateTwoot/> -->
    <!-- <LogIn/> -->
  </div>
</template>

<script>
import Twoots from './components/Twoots.vue'
import SignUp from './components/SignUp.vue'
import CreateTwoot from './components/CreateTwoot.vue';
import LogIn from './components/LogIn.vue'


export default {
  name: 'App',
  components: {
    Twoots,
    SignUp,
    CreateTwoot,
    LogIn
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
