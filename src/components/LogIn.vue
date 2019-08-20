<template>
  <!-- <div> -->
    <!-- <form> -->
    <!-- <form action="POST" @submit.prevent="logIn(email,password)"> -->
      
      <!-- <input type="username" v-model="username" placeholder="Username"> -->
      <!-- <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password"> -->
      <!-- <button type="submit">Log In</button> -->
      <!-- <button v-on:click="logIn" class="btn nav-link ">Log in</button>     -->

    <!-- </form> -->
  <!-- </div> -->
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
        <div class="form-group">
            <label for="email">email</label>
            <input type="email" v-model="email" name="email" class="form-control"  />
            <!-- <div v-show="submitted && !username" class="invalid-feedback">Username is required</div> -->
        </div>
        <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" v-model="password" name="password" class="form-control"  />
            <!-- <div v-show="submitted && !password" class="invalid-feedback">Password is required</div> -->
        </div>
        <div class="form-group">
            <button class="btn btn-primary" >Login</button>
            <!-- <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> -->
            <router-link to="/register" class="btn btn-link">Register</router-link>
        </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { onLogin } from '../vue-apollo'

let vm = new Vue({

  })

export default {
  name: "Login",
  data () {
    return {
      email: '',
      username: 'oi',
      password: '',
      id: ''
    }
  },
  methods: {
    ...mapActions(['logIn', 'helle', 'yo', 'setSignedInState', 'getUserByEmail', 'getUserTwoots']),
    oi(email, id, token){
      console.log('yoyoyo')
      this.yo()
      this.setSignedInState(email, id, token)
    },
    handleSubmit (e) {
            // this.submitted = true;
            const { email, password } = this;
            if (email && password) {
                this.logIn({ email, password })
            }
            // this.$router.push('/')

        },
    // logIn(){
    //   // e.preventDefault()
    //   this.logIn(this.email, this.password)
    // },

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
                username
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
        console.log(this.username)
        this.oi()
        this.helle()
        this.username = res.data.signinUser.token
        console.log(this.username)
        const token = res.data.signinUser.token
        console.log(res.data.signinUser.user.id)
        // const id = res.data.signinUser.user.id
        this.id = res.data.signinUser.user.id
        console.log(res.data.signinUser.user.email)
        const email = res.data.signinUser.user.email
        this.getUserByEmail(email)
        // this.getUserTwoots()
        // console.log('username',res.data.signinUser.user.username)
        onLogin(this.$apollo.provider.defaultClient, res.data.signinUser.token )
        // Login.signIn(email, id, token)
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
        })
      .catch(err => console.log(err))
    }
    
  }
}
</script>

