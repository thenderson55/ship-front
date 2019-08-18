<template>
    <!-- <div v-for="twoot in twoots" :key="twoot.id">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{twoot.user.email}}</span>
          <el-button v-on:click="follow(twoot.user.email, 2)" style="float: right; padding: 3px 0" type="text">Delete</el-button>
        </div>
        <div class="text item">
          {{twoot.content}}
        </div>

      </el-card>
    </div> -->

    <div class="wrapper">  
      <div class="form-group input-group" v-for="twoot in twoots" :key="twoot.id">
        <p class="form-control" rows="3">{{twoot.content}}</p>
       
        <p class="btn-s btn-primary name" v-on:click="follow(twoot.user.email, 2)">
          {{twoot.user.email}}
          <span>Hello</span>
          <button class="btn-s btn-success unfollow" v-text="unfollow"></button>
        </p>
      </div>
      <button v-on:click="twooty">HH</button>

      <div v-for="tweet in allTweets" :key="tweet.id">
        <p>{{tweet.content}}</p>
      </div> 
      <p>{{user}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from "graphql-tag";

export default {
  name: "Twoots",
  computed:{
    ...mapGetters(['allTweets', 'user']),
  },  
  data() {
    return {
      email: '',
      userId: '',
      unfollow: 'Unfollow',
      twoots: ''
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
    twooty(){
      console.log(this.twoots)
      console.log(this.user)

    }, 
    hello(){
      console.log('hello')
    },
    follow (email, userId) {
      this.$apollo
        .mutate({
          mutation: gql`
          mutation ($email: String!, $userId: Int!){
            createFollowing( 
              email: $email,
              userId: $userId
             ){ 
              email
            }
          }`,
          variables: { 
            email: email,
            userId: userId
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
  // Optional Vanilla JS way
  mounted() {
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query{
              twoots{
                  content
                  id
                  user {
                      email
                    }
                }
            }
          `
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      this.twoots = res.data.twoots
    }),

    this.hello(),

    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query getFollowingList($id: Int!){
              followingsByUserId(userId: $id){
                  email
                }
            }`,
            variables: { id: this.user },
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('l', res)
      // this.twoots = res.data.twoots
    })
  }
};


// console.log(hello)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 70%;
  height: 20%;
  margin: 0;
  padding:0;
  flex-wrap: wrap
}
p{
  height: 85px;
}
.name {
  width: 127px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.unfollow {
  border-radius: 0px;
  width: 100%;
  margin-bottom: -7px;
}
/* .text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin-bottom: 10px;
} */
</style>