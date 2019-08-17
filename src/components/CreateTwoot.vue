<template>    
    <!-- <div class="card-body">
      <form method="POST" @submit.prevent="createtwoot" action="">
        <div class="card-text">
          <input type="textarea" class="control" placeholder="Build Something Awesome" :maxlength="max" v-model="content" />
        </div>
      </form>
    </div> -->
    <div class="wrapper">

      <form method="POST" @submit.prevent="createtwoot">
        
        <div class="form-group input-group">
          <textarea class="form-control" v-model="content" rows="3"></textarea>
          <div class="input-group-append">
            <span class="input-group-text" v-text="(max - content.length)"></span>
          </div>
          <button class="btn-s btn-primary">Twoot it!</button>
        </div>
      </form>
    </div>
<!-- 
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" v-text="(max - content.length)"></span>
      </div>
      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
      <div class="input-group-append">
        <span class="input-group-text">.00</span>
      </div>
    </div> -->

    <!-- <div class="input-group">
      <div class="input-group-append">
        <div class="input-group-addon" v-text="(max - content.length)"></div>
      </div>
      <textarea class="form-control" aria-label="With textarea"></textarea>
    </div> -->
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "CreateTwoot",
  data() {
    return {
      max: 140,
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
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrapper {
  margin: 0px!;
  padding: 0px!;
}
.btn-s {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.twoot {
  width: 100%;
}
.wrapper {
  width: 70%;
  margin: 0;
  padding:0;
}
/* .card {
  width: 70%;
}

input{
  top: 8px;
  bottom: 10px;
  left: 20px;
}

.control {
  
  height: 100px;
} */
</style>