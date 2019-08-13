<template>
  <div>
    <div v-for="example in examples">{{example.name}}</div>
    <!-- <div v-for="job in jobs">
      {{job.id}}
    </div>-->
    <!-- <div v-for="twoot in twootss">{{twoot.content}}</div> -->
    <div v-for="twoot in twoots">{{twoot.content}}</div>
    <!-- <div>{{ hello }}</div> -->
  </div>
</template>

<script>
import gql from "graphql-tag";

// function getTwoot(){
//   fetch('https://api.graphql.jobs/',
//   {
//     method:'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       query:`
//       jobs {
//         id
//         cities {
//           name
//         }
//       }
//       `
//     })
//   })
//   .then(res => {
//     console.log(res)
//     return res.json()
//   }).then(res => {
//     console.log(res.data)
//   })
// }
// getTwoot()

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
    // Simple query that will update the 'hello' vue property
    // jobs: gql`
    //   query {
    //     jobs {
    //       id
    //       cities {
    //         name
    //       }
    //     }
    //   }`,
    twoots: gql`
      query {
        twoots {
          content
        }
      }
    `,
    
  },
  mounted() {
    fetch("https://api.graphql.jobs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query{
              jobs {
                id
                cities {
                  name
                }
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
        console.log(res);
      });

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