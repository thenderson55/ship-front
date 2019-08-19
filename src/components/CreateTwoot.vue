<template>    
  <div class="wrapper">
    <form method="POST" @submit="onSubmit">       
      <div class="form-group input-group">
        <textarea class="form-control" v-model="content" :maxlength="max" rows="3" ref="myDiv"></textarea>
        <div class="input-group-append">
          <span class="input-group-text" v-text="(max - content.length)"></span>
        </div>
        <button type="submit" class="btn-s btn-primary">Twoot it!</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import gql from "graphql-tag";

export default {
  name: "CreateTwoot",
   computed:{
      ...mapGetters([ 'user' ])
    }, 
  data() {
    return {
      max: 140,
      content: '',
      userId: '',
      value: "go"

    };
    console.log(userId)
  },
 
  methods: {
    ...mapActions(['createTwoot']),
    onSubmit(e){
      e.preventDefault()
      this.createTwoot(this.content)
      // To reset textarea content
      this.$refs.myDiv.value = ""
    }
    // createtwoot () {
    //   this.$apollo
    //     .mutate({
    //       mutation: gql`
    //       mutation ($content: String!, $userId: Int!){
    //         createTwoot( 
    //           content: $content,
    //           userId: $userId
    //          ){ 
    //           content
    //           userId
    //         }
    //       }`,
    //       variables: { 
    //         content: this.content,
    //         userId: parseInt(this.user)
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
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-s {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: RGB(5, 123, 247);
}
.btn-s:hover {
  background-color: RGB(5, 123, 240);
}
</style>  