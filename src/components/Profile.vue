<template>
  <div class="body">
    <h5>{{username}}'s twoots</h5>
    <Twoot class="wrapper" v-for="twoot in twootsById" :twoot="twoot" :buttonText="buttonText" :followFunction="removeFollowing" :key="twoot.id"/>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Twoot from './Twoot.vue'
import gql from "graphql-tag";

export default {
  props: ['id'],
  components: {
    Twoot,
  },
  name: "Profile",
  computed:{
    ...mapGetters(['twootsById', 'user', 'username'])
  }, 
  created(){
    this.getTwootsById(this.$props.id)
  }, 
  data() {
    return {
      buttonText: 'Follow'
    };
  },
  methods: {
    ...mapActions(['getTwootsById', 'addFollowing']),
    addNewFollowing(email){
      this.addFollowing($route.params.id)
    },
  }
}
</script>

<style>

</style>
