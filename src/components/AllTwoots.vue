<template>
  <div class="body">
    <h5>AllTwoots!</h5>

    <Twoot class="wrapper" v-for="twoot in allTwoots" :twoot="twoot" :buttonText="buttonText" :followFunction="addNewFollowing" :key="twoot.id"/>    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Twoot from './Twoot.vue'
import gql from "graphql-tag";

// For random img each rerender
// :src="`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 30) + 1}.jpg`"

export default {
  name: "Twoots",
  components: {
    Twoot,
  },
  computed:{
    ...mapGetters(['allTwoots', 'user', 'followingList', 'followersTwoots'])
  }, 
  created(){
    this.fetchTwoots()
  }, 
  data() {
    return {
      buttonText: 'Follow',
    };
  },
  methods: {
    ...mapActions(['fetchTwoots', 'addFollowing']),
    addNewFollowing(email){
      this.addFollowing(email)
    },
    // follow (email) {
    //   this.$apollo
    //     .mutate({
    //       mutation: gql`
    //       mutation ($email: String!, $userId: Int!){
    //         createFollowing( 
    //           email: $email,
    //           userId: $userId
    //          ){ 
    //           email
    //         }
    //       }`,
    //       variables: { 
    //         email: email,
    //         userId: this.user
    //       }
    //     })
    //     .then(res => {
    //       console.log(res.data)
    //       })
    //     .catch(err => {
    //       console.log(err)
    //       alert("Nooo")
    //     })
    // }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>