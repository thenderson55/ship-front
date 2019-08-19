<template>
  <div class="body">
    <Twoot class="wrapper" v-for="twoot in twootsById" :twoot="twoot" :buttonText="buttonText" :followFunction="removeFollowing" :key="twoot.id"/>  
    <!-- <div class="wrapper">  
      <div class="form-group input-group" v-for="twoot in twootsById" :key="twoot.id">
        <p class="form-control content" rows="3">{{twoot.content}}</p>
        <div>
          <div class="name" >
            <router-link :to="`/profile/${twoot.user.id}`" class="link">
              <img src="https://randomuser.me/api/portraits/men/4.jpg" class="avatar">
              {{twoot.user.id}}
              {{twoot.user.email}}
            </router-link>
          </div>
          <button  v-on:click="() => addNewFollowing(twoot.user.email)" class="btn-s btn-success unfollow" v-text="unfollow"></button>
        </div>
      </div>
    </div> -->
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
    ...mapGetters(['twootsById', 'user'])
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
