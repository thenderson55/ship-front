<template>

    <div class="wrapper">  
      <div class="form-group input-group" v-for="twoot in allTwoots" :key="twoot.id">
        <p class="form-control" rows="3">{{twoot.content}}</p>
       
        <p class="btn-s btn-primary name" >
          {{twoot.user.email}}
          <span>{{twoot.id}}</span>
          <button  v-on:click="() => addNewFollowing(twoot.user.email)" class="btn-s btn-success unfollow" v-text="unfollow"></button>
        </p>
      </div>
      <p>{{allTwoots.length}}</p>
      <p>{{followersTwoots.length}}</p>
      <p>{{user}}</p>
      <p>{{followingList[0].email}}</p>
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
      unfollow: 'Unfollow',
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
    ...mapActions(['fetchTwoots', 'addFollowing']),
    addNewFollowing(email){
      this.addFollowing(email)
      // To reset textare content
      // this.$refs.myDiv.value = ""
    },

    follow (email) {
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
            userId: this.user
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
  }
};

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