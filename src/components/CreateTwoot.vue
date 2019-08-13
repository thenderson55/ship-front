<template>
  <div>
    <form method="POST" @submit.prevent="createtwoot" action="">
      <label for="">Twoot</label>
      <input type="textarea" v-model="content" name="" id="">
      <label for="">ID</label>
      <input type="text" v-model="userId" name="" id="">
      <button>Twoot it!</button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
console.log('yay')
// import { SIGNUP_MUTATION } from "../graphql"

export default {
  name: "CreateTwoot",
  data() {
    return {
      content: '',
      userId: ''
    };
    console.log(userId)
  },
 
  methods: {
    createtwoot () {
      this.$apollo
        .mutate({
          mutation: gql`
          mutation ($content: String!, $userId: Int!){
            createTwoot( 
              content: $content,
              userId: $userId
             ){ 
              content
              userId
            }
          }`,
          variables: { 
            content: this.content,
            userId: parseInt(this.userId)
          }
        })
        .then(res => {
          console.log(res.data)
          })
        .catch(err => {
          console.log(err)
          alert("Nooo")
        })
    }
  },
  // apollo: 
  //   signUpMutation: gql`
  //     mutation signUpMutation($email: String!, $password:String!){
  //       createUser(
  //         authProvider: {
  //           email: {
  //             email: $email
  //             password: $password
  //           }
  //         }
  //       ){ 
  //         email
  //         id
  //       }
  //  
  //   `,
  //   twoots: gql`
  //     query {
  //       twoots {
  //         content
  //       }
  //     }
  //   `,
    
  // },

};

// console.log(hello)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>