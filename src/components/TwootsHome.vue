<template>
  <div class="body">
    <CreateTwoot/>
    <br>
    <Twoot class="wrapper" v-for="twoot in myFeed" :twoot="twoot" :buttonText="buttonText" :followFunction="removeFollowing" :key="twoot.id"/>  
    <p>Current user: {{user}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Twoot from './Twoot.vue'
import CreateTwoot from'./CreateTwoot.vue'
import gql from "graphql-tag";
import { setTimeout } from 'timers';

export default {
  name: "TwootsHome",
  components: {
    Twoot,
    CreateTwoot
  },
  computed:{
    ...mapGetters(['user','myFeed', 'myNewFeed' ])
  }, 
  mounted(){
    
    this.fetchTwoots()
    this.getUserTwoots()
  }, 
  // created(){
    
  //   this.fetchTwoots()
  //   this.getUserTwoots()
  // }, 
  data() {
    return {
      max: 140,
      content: '',
      userId: '',
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
    ...mapActions(['fetchTwoots', 'deleteFollowing', 'createTwoot', 'getUserTwoots']),
    removeFollowing(email){
      this.deleteFollowing(email)
    },
    // onSubmit(e){
    //   e.preventDefault()
    //   this.createTwoot(this.content)
    //   // To reset textarea content
    //   this.$refs.myDiv.value = ""
    // }

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
/* .btn-s {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: RGB(5, 123, 247);
}
.btn-s:hover {
  background-color: RGB(5, 123, 240);
} */
</style>