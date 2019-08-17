<template>
  <div class="body">
    <div v-for="twoot in twoots" :key="twoot.id">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{twoot.user.email}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">Delete</el-button>
        </div>
        <div class="text item">
          {{twoot.content}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Apollo",
  data() {
    return {
      msg: "Welcome to Your p",
      examples: [{ name: "Tommy" }, { name: "Bob" }],
      twootss: []
    };
  },
  apollo: {
    twoots: gql`
      query {
        twoots {
          content
          id 
          user {
            email
          }
        }
      }
    `,
    
  },
  methods () {

  },

  // Optional Vanilla JS way
  mounted() {
    // fetch("http://localhost:3000/graphql/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     query: `
    //         query{
    //           twoots{
    //               content
    //               id
    //               user {
    //                   email
    //                 }
    //             }
    //         }
    //       `
    //   })
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(res => {
    //     this.twootss = res.data.twoots
    //   });
  }
};


// console.log(hello)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
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
}
</style>