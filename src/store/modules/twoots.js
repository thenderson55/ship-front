const state = {
  user: 2,
  followingList: [],
  followingEmailList: [],
  allTwoots: [],
  followersTwoots: [],
  twootsById: [],
  // currentUserTwoots: [],
  myTwoots: []
};

const getters = {
  myFeed: state => state.myTwoots.concat(state.followersTwoots).sort(function(a, b) { 
    return b.id - a.id  
  }),
  allTwoots: state => state.allTwoots,
  followingList: state => state.followingList,
  twootsById: state => state.twootsById,
  user: state => state.user

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
                        id
                        username
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
                    id
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
    const followingList = data[1].data.followingsByUserId;
    const followingEmails = followingList.map(el => el.email)
    console.log('follow email', followingEmails)
    const followersTwoots = [];
    // Find all twoots whose email matches the email of the people current user follows
    twoots.forEach(twoot => {
      followingEmails.forEach(el => {
        if (el == twoot.user.email) {
          followersTwoots.push(twoot);
        }
      });
    });
    commit("setTwoots", twoots);
    commit("setFollowingEmailList", followingEmails);
    commit("setFollowersTwoots", followersTwoots);
  },


  // ADD an email to following list

  async addFollowing({ commit }, email) {
    console.log('add', email)
    console.log('add',state.followingEmailList)
    const checkList = state.followingEmailList.filter(el => el == email)
    if(checkList.length > 0) return 

    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              mutation AddNewFollowing($email: String!, $userId: Int!){
                createFollowing(email: $email, userId: $userId){
                    email
                  }
              }`,
        variables: {
          email: email,
          userId: state.user
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('yooooo')
      console.log(res.data.createFollowing.email)
      const addedEmail = res.data.createFollowing.email
      commit('addToEmailList', addedEmail)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  },


  // DELETE email from following list

  async deleteFollowing({ commit }, email) {
    console.log('del', email)
    console.log('del',state.followingEmailList)
    if(!state.followingEmailList.includes(email)) return 
    
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              mutation DeleteFollowing($email: String!, $userId: Int!){
                destroyFollowing(email: $email, userId: $userId){
                    email
                  }
              }`,
        variables: {
          email: email,
          userId: state.user
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res)
      console.log(res.data.destroyFollowing.email)
      const deletedEmail = res.data.destroyFollowing.email
      commit('removeFromEmailList', deletedEmail)
    })
    .catch(err => {
      console.log(err);
    });
  },



  //NNNNNNN
  // Add a new person to user following list
  // async addFollowing({ commit }, email) {
  //   let contains = false
  //   state.followingList.forEach(el => {
  //     if(el.email == email){
  //       contains = true
  //       return
  //     } 
  //   })
  //   if(contains) {
  //     return
  //   }
  //   fetch("http://localhost:3000/graphql/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //             mutation AddNewFollowing($email: String!, $userId: Int!){
  //               createFollowing(email: $email, userId: $userId){
  //                   email
  //                 }
  //             }`,
  //       variables: {
  //         email: email,
  //         userId: state.user
  //       }
  //     })
  //   })
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(res => {
  //     console.log('yooooo')
  //     console.log(res.data.createFollowing.email)
  //     const newFollowing = { email: res.data.createFollowing.email, userId: state.user }
  //     const newFollowingList = state.followingList.push(newFollowing)
      
  //     const newFollowersTwoots = [];
  //     // Find all twoots whose email matches the email of the people current user follows
  //     state.twoots.forEach(twoot => {
  //       console.log(twoot.content);
  //       newFollowingList.forEach(el => {
  //         if (el.email == twoot.user.email) {
  //           newFollowersTwoots.push(twoot);
  //         }
  //       });
  //     });
  //     commit('addToFollowingList', newFollowingList )
  //     commit('increaseTwootList', newFollowersTwoots )
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // },

  // // Remove someone from users following list
  // async deleteFollowing({ commit }, email) {
  //   // let contains = true
  //   // let followingId = ""
  //   // state.followingList.forEach(el => {
  //   //   if(el.email == email){
  //   //     followingId = el.id
  //   //     contains = false
  //   //     return
  //   //   } 
  //   // })
  //   // if(contains) {
  //   //   return
  //   // }
  //   console.log(followingId)
  //   fetch("http://localhost:3000/graphql/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //             mutation DeleteFollowing($id: ID!){
  //               destroyFollowing(id: $id){
  //                   email
  //                 }
  //             }`,
  //       variables: {
  //         id: followingId
  //       }
  //     })
  //   })
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(res => {
  //     console.log(res)
  //     console.log(res.data.destroyFollowing.email)
  //     const removedEmail = res.data.destroyFollowing.email
  //     const updatedList = state.followingList.filter(el => {
  //       return el.email != removedEmail
  //     })
  //     const updatedFollowersTwoots = []
  //     state.twoots.forEach(twoot => {
  //       console.log(twoot.content);
  //       updatedList.forEach(el => {
  //         if (el.email == twoot.user.email) {
  //           updatedFollowersTwoots.push(twoot);
  //         }
  //       });
  //     });
  //     commit( 'removeFromFollowingList', updatedList )
  //     commit( 'deleteFollowingsTwoots', updatedFollowersTwoots )
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // },






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
      state.myTwoots.push(newTwoot)
      // const myFeed = state.currentUserTwoots.concat(state.followersTwoots)
      state.myTwoots.sort(function(a, b) { 
        return b.id - a.id  
      });
      commit('updateMyTwoots', state.myTwoots)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  },

  async getTwootsById({ commit }, userId) {
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTwootsById($userId: Int!){
            twoot(userId: $userId){
                content
                id
                user {
                    email
                    id
                    username
                  }
              }
          }`,
        variables: {
          userId: parseInt(userId)
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res.data.twoot[0].content)
      commit('twootsById', res.data.twoot)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  },

  // GET all users twoots
  async getUserTwoots({ commit }) {
    fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetTwootsById($userId: Int!){
            twoot(userId: $userId){
                content
                id
                user {
                    email
                    id
                    username
                  }
              }
          }`,
        variables: {
          userId: state.user
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res.data)
      commit('setMyTwoots', res.data.twoot)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  },
};

const mutations = {
  setTwoots: (state, twoots) => (state.allTwoots = twoots),
  setFollowingEmailList: (state, followingList) =>
  (state.followingEmailList = followingList),
  setFollowersTwoots: (state, followersTwoots) =>
  (state.followersTwoots = followersTwoots),
  setMyTwoots: (state, twoots) => (state.myTwoots = twoots),
  updateMyTwoots: (state, myTwoots) => (state.myTwoots = myTwoots),
  twootsById: (state, twootsById) => (state.twootsById = twootsById),
  addToEmailList: (state, addEmail) => (state.followingEmailList.push(addEmail)),
  removeFromEmailList: (state, removeEmail) => (state.followingEmailList.splice(removeEmail, 1)),
};

export default {
  state,
  getters,
  actions,
  mutations
};
