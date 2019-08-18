<template>
  <div class="nav-bar">
    <ul class="nav justify-content-end">
      <li class="nav-item mr-auto">
        <router-link class="nav-link" to="/">Twotter</router-link>
      </li>
      <li class="nav-item ">
        <router-link  class="nav-link float-right" to="/alltwoots">All Twoots</router-link>
      </li>
      <li class="nav-item ">
        <router-link  class="nav-link float-right" to="/login">Log in</router-link>
      </li>
      <li class="nav-item ">
        <button v-on:click="logOut" class="btn nav-link ">Log out</button>    
      </li>
    </ul>
  </div>
</template>


<script>
  import { onLogout } from '../vue-apollo'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logOut() {
        onLogout(this.$apollo.provider.defaultClient)
      }
    }
  }
</script>

<style>
.nav-bar {
  margin-bottom: 40px;
}

</style>
