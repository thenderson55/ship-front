<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Apollo/>
    <SignUp/>
  </div>
</template>

<script>
import Apollo from './components/Apollo.vue'
import SignUp from './components/SignUp.vue'

export default {
  name: 'app',
  components: {
    // ApolloExample
    Apollo,
    SignUp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
