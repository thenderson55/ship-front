<template>
  <div class="body">
    <CreateTwoot/>
    <br>
    <Twoot class="wrapper" v-for="twoot in followersTwoots" :twoot="twoot" :buttonText="buttonText" :followFunction="removeFollowing" :key="twoot.id"/>  
    <p>Current user: {{user}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Twoot from './Twoot.vue'
import CreateTwoot from'./CreateTwoot.vue'
import gql from "graphql-tag";

export default {
  name: "TwootsHome",
  components: {
    Twoot,
    CreateTwoot
  },
  computed:{
    ...mapGetters(['allTwoots', 'user', 'followingList', 'followersTwoots'])
  }, 
  created(){
    this.fetchTwoots()
  }, 
  data() {
    return {
      buttonText: 'Unfollow',
    };
  },
  // apollo: {
  //   twoots: gql`
  //     query {
  //       twoots {
  //         content
  //         id 
  //         user {
  //           email
  //         }
  //       }
  //     }
  //   `,
    
  // },
  methods: {
    ...mapActions(['fetchTwoots', 'deleteFollowing']),
    removeFollowing(email){
      this.deleteFollowing(email)
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
<style>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  width: 70%;
  margin-bottom: 10px;
  padding:0;
}
</style>