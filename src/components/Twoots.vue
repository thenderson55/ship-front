<template>
  <div>
    <div v-for="twoot in twoots" :key="twoot.id">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{twoot.content}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">Delete</el-button>
        </div>
        <div  class="text item">
          {{twoot.id}}
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
        }
      }
    `,
    
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
                }
            }
          `
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res.data.twoots);
        this.twootss = res.data.twoots
      });
  }
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