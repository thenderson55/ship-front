<template>
  <div>
    <form action="POST" @submit.prevent="login">
      <!-- <input type="username" v-model="username" placeholder="Username"> -->
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { onLogin } from '../vue-apollo'

export default {
  data () {
    return {
      email: '',
      // username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$apollo.mutate({
        mutation: gql`mutation($data: AUTH_PROVIDER_EMAIL!) {
            signinUser(
              email: $data)
              {
              token
              user {
                email
                id
              }
            }
          }
        `,
        variables: {
          data: { 
            // username: this.username, 
            email: this.email,
            password: this.password 
          }
        }
      })
      .then(res => {
        console.log(res.data.signinUser.token)
        console.log(res.data.signinUser.user.email)
        onLogin(this.$apollo.provider.defaultClient, res.data.signinUser.token )
        this.$router.push('/')
        })
      .catch(err => console.log(err))
    }
    
  }
}
</script>

