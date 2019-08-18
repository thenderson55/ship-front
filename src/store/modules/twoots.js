const state = {
  user: 2,
  followingList: "",
  twoots: "",
  followersTwoots: ""
};

const getters = {
  allTwoots: state => state.twoots,
  followingList: state => state.followingList,
  followersTwoots: state => state.followersTwoots
};

const actions = {
  async fetchTwoots({ commit }) {
    // Need both sets of data to work with after so using Promise.all
    const data = await Promise.all([
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
      }).then(res => {
        return res.json();
      }),
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
          variables: { id: state.user }
        })
      }).then(res => {
        return res.json();
      })
    ]);

    // Get the array of data once all Promises have succeeded
    const twoots = data[0].data.twoots;
    twoots.sort(function(a, b) { 
      return b.id - a.id  
    });
    const list = data[1].data.followingsByUserId;
    const followersTwoots = [];

    // Find all twoots whose email matches the email of the people current user follows
    twoots.forEach(twoot => {
      list.forEach(el => {
        if (el.email == twoot.user.email) {
          console.log(twoot.content);
          followersTwoots.push(twoot);
        }
      });
    });

    commit("setTwoots", twoots);
    commit("setFollowingList", list);
    commit("setFollowersTwoots", followersTwoots);
  },

  async addFollowing({ commit }, email) {},

  async createTwoot({ commit }, content) {
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              mutation CreateTwoot($content: String!, $userId: Int!){
                createTwoot(content: $content, userId: $userId){
                    content
                    id
                    user {
                      email
                    }
                  }
              }`,
        variables: {
          content: content,
          userId: state.user
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const content = res.data.createTwoot.content;
      const email = res.data.createTwoot.user.email;
      const id = res.data.createTwoot.id;
      const newTwoot = {
        content,
        id,
        user: { email }
      };
      commit('newTwoot', newTwoot)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  }

  // async fetchTwoots({commit}) {
  //   await fetch("http://localhost:3000/graphql/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //           query{
  //             twoots{
  //                 content
  //                 id
  //                 user {
  //                     email
  //                   }
  //               }
  //           }
  //         `
  //     })
  //   })
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(res => {
  //     console.log('vuex', res.data.twoots)
  //     commit('setTwoots', res.data.twoots )
  //     // this.twoots = res.data.twoots
  //   })
  // }
};

const mutations = {
  setTwoots: (state, twoots) => (state.twoots = twoots),
  setFollowingList: (state, followingList) =>
    (state.followingList = followingList),
  setFollowersTwoots: (state, followersTwoots) =>
    (state.followersTwoots = followersTwoots),
  newTwoot: (state, twoot) => state.twoots.unshift(twoot)
};

export default {
  state,
  getters,
  actions,
  mutations
};
