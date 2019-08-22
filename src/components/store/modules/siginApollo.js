import { createProvider } from './vue-apollo'
import gql from 'graphql-tag'


const state = {
  user: '',
  userEmail:'',
  userToken: '',

}

const getters = {

}

const actions = {
  // setSignedInState({commit}, email, id, token) {
  //   console.log('YOOOOO form sigin')
  //   console.log(email)
  //   console.log(id)
  //   console.log(token)
  // },

  async logIn({commit}, email, password) {
    console.log('input', email, password)
    const data = {
      email: email,
      password: password 
    }
    // this.hello()
    // this.$apollo.mutate({
    //   mutation: gql`mutation($data: AUTH_PROVIDER_EMAIL!) {
    //       signinUser(
    //         email: $data)
    //         {
    //         token
    //         user {
    //           email
    //           id
    //           username
    //         }
    //       }
    //     }
    //   `,
    //   variables: {
    //     data: { 
    //       // username: this.username, 
    //       email: this.email,
    //       password: this.password 
    //     }
    //   }
    // })
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              mutation signinUser($data: AUTH_PROVIDER_EMAIL!){
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
              }`,
         variables: {
            data: {
              email: email,
              password: password
            }
        }
      })
    })
    .then(res =>  {
      return res.json()
    })
    .then(res => {
      // this.hello()
      console.log(res)
      // console.log(res.data.signinUser.token)
      // const token = res.data.signinUser.token
      console.log(res.data.signinUser.user.id)
      const id = res.data.signinUser.user.id
      console.log(res.data.signinUser.user.email)
      const email = res.data.signinUser.user.email
      console.log('username',res.data.signinUser.user.username)
      localStorage.setItem("apollo-token", res.data.signinUser.token)
      // onLogin(this.$apollo.provider.defaultClient, res.data.signinUser.token )
   
      router.push('/')
      })
    .catch(err => console.log(err))
  }

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
};