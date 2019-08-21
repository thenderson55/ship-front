
const state = {
  isLoggedIn: true,
  user: 3,
  userEmail:'kate@kate.com',
  userToken: '',
  followingList: [],
  followingEmailList: [],
  allTwoots: [],
  followersTwoots: [],
  twootsById: [],
  // currentUserTwoots: [],
  myFeed: [],
  // myFeed: []
};

const getters = {
  myFeed: state => state.myFeed,
  allTwoots: state => state.allTwoots,
  followingList: state => state.followingList,
  twootsById: state => state.twootsById,
  user: state => state.user,
  userEmail: state => state.userEmail

};

const actions = {
  toggleLogin({commit}){
    console.log('toggle')
    console.log(!state.isLoggedIn)
    const change = state.isLoggedIn = !state.isLoggedIn
    commit('toggle', change)
  },

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
      }),
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
          userId: parseInt(state.user) 
        }
      })
    })
    .then(res => {
      return res.json();
    })


    ]);
    // Get the array of data once all Promises have succeeded
    const myTwoots = data[2].data.twoot
    const allTwoots = data[0].data.twoots;
    allTwoots.sort(function(a, b) { 
      return b.id - a.id  
    });
    const followingList = data[1].data.followingsByUserId;
    const followingEmails = followingList.map(el => el.email)
    const followersTwoots = [];
    // Find all twoots whose email matches the email of the people current user follows
    allTwoots.forEach(twoot => {
      followingEmails.forEach(el => {
        if (el == twoot.user.email) {
          followersTwoots.push(twoot);
        }
      });
    });

    // Create ordered list for home feed of user twoots and following twoots
    const homeList = followersTwoots.concat(myTwoots).sort(function(a, b) { 
      return b.id - a.id  
    })

    commit("setFeed", homeList)
    commit("setTwoots", allTwoots);
    commit("setFollowingEmailList", followingEmails);
    commit("setFollowersTwoots", followersTwoots);
  },


  // ADD an email to following list
  async addFollowing({ commit }, email) {
    console.log('add', email)
    console.log('add',state.followingEmailList)
    // const checkList = state.followingEmailList.filter(el => el == email)
    // if(checkList.length > 0) return 
    if(state.followingEmailList.includes(email)) {
      console.log('inlcudes email')
      return
    }
    // Can't follow self
    if(email == state.userEmail) {
      console.log('cant follow yourself')
      return
    }

    await fetch("http://localhost:3000/graphql/", {
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
    
    await fetch("http://localhost:3000/graphql/", {
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
      const deletedEmail = res.data.destroyFollowing.email
      const updatedFollowingTwoots = state.followersTwoots.filter(twoot => {
        return twoot.user.email != deletedEmail
      })
      const updatedFeed = state.myFeed.filter(twoot => {
        return twoot.user.email != deletedEmail
      })
      commit('removeFromEmailList', deletedEmail)
      commit('updateFeed', updatedFeed)
      commit('updateTwoots', updatedFollowingTwoots)
    })
    .catch(err => {
      console.log(err);
    });
  },


  // CREATE a twoot and add to my feed
  async createTwoot({ commit }, content) {
    await fetch("http://localhost:3000/graphql/", {
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

  // GET all the twoots of user from their id to display in profile
  async getTwootsById({ commit }, userId) {
    await fetch("http://localhost:3000/graphql/", {
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

  // GET user info
  async getUserByEmail({ commit }, email) {
    await fetch("http://localhost:3000/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetUserId($email: String!){
            getUserByEmail(email: $email){
              id
            }
          }`,
          variables: {
            email
          }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('get suer',res.data.getUserByEmail.id)
      const currentUserId = res.data.getUserByEmail.id
      localStorage.setItem("id", currentUserId);
      commit('setUserId', currentUserId )
      // console.log(email)
    })
    .catch(err => {
      console.log(err);
      alert("Nooo");
    });
  },
};

const mutations = {
  setUserId: (state, user) => (state.user = user),
  toggle: (state, toggle) => (state.isLoggedIn = toggle),

  setTwoots: (state, twoots) => (state.allTwoots = twoots),
  setFollowingEmailList: (state, followingList) =>
  (state.followingEmailList = followingList),
  setFollowersTwoots: (state, followersTwoots) =>
  (state.followersTwoots = followersTwoots),
  updateTwoots: (state, twoots) => (state.followersTwoots = twoots),
  setFeed: (state, feed) => (state.myFeed = feed),
  updateFeed: (state, feed) => (state.myFeed = feed),
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
