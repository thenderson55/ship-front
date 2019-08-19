<template>
  <div class="body">

    <div class="wrapper">  
      <div class="form-group input-group" v-for="twoot in allTwoots" :key="twoot.id">
        <p class="form-control" rows="3">{{twoot.content}}</p>
        <div>

          <div class="name" >
            <router-link to="/" class="link">
              <img class="avatar">
              {{twoot.user.email}}
            </router-link>
          </div>
          <button  v-on:click="() => addNewFollowing(twoot.user.email)" class="btn-s btn-success unfollow" v-text="unfollow"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import gql from "graphql-tag";

export default {
  name: "Twoots",
  computed:{
    ...mapGetters(['allTwoots', 'user', 'followingList', 'followersTwoots'])
  }, 
  created(){
    this.fetchTwoots()
  }, 
  data() {
    return {
      unfollow: 'Follow',
    };
  },
  methods: {
    ...mapActions(['fetchTwoots', 'addFollowing']),
    addNewFollowing(email){
      this.addFollowing(email)
    }

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
.body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  width: 70%;
  height: 20%;
  margin: 0;
  padding:0;
  flex-wrap: wrap
}
p{
  height: 100px;
}
.name {
  margin:0!;
  padding:0!;
  width: 127px;
  height: 71px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
}

.name:hover {
}

.link {
  text-align: center;
  color: white;
}

.link:hover {
  background-color: darkblue;
  text-decoration: none; 
}

.unfollow {
  border-radius: 0px;
  width: 100%;
  margin-bottom: -7px;
}

.avatar {  
  width: 40px;
  height: 40px;
  z-index: 1;
  position: relative;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(71, 81, 93);
  border-image: initial;
  border-radius: 50%;
}

</style>