<template>
  <div>
    <form method="POST" @submit.prevent="signup" action="">
      <label for="">Email</label>
      <input type="email" v-model="email" name="" id="">
      <label for="">Password</label>
      <input type="password" v-model="password" name="" id="">
      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
  console.log('yay')
// import { SIGNUP_MUTATION } from "../graphql"

export default {
  name: "SignUp",
  data() {
    return {
      email: '',
      password: ''
    };
  },
 
  methods: {
    signup () {
      this.$apollo
        .mutate({
          mutation: gql`
          mutation ($data: AuthProviderSignupData!){
            createUser( authProvider: $data ){ 
              email
              id
            }
          }`,
          variables: { 
            data: {
              email: {
                email: this.email,
                password: this.password
              }       
            }
          }
        })
        .then(res => {
          console.log(res.data.createUser.email)
          alert(`You have signed up with the email: ${res.data.createUser.email}`)})
        .catch(err => {
          console.log(err)
          alert("Email address already taken, please try another..")
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