const state = {
  user: 2,
  followingList: '',
  twoots: '',
  followersTwoots: ''
}

const getters = {
  allTwoots: state => state.twoots,
  followingList: state => state.followingList,
  followersTwoots: state => state.followersTwoots
}

const actions = {
  async fetchTwoots({commit}){
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
      })
      .then(res => {
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
              variables: { id: state.user },
        })
      })
      .then(res => {
        return res.json();
      }) 
    ])
    const twoots = data[0].data.twoots
    const list = data[1].data.followingsByUserId
    const followersTwoots = []

    twoots.forEach(twoot => {
      list.forEach(el => {
        if(el.email == twoot.user.email){
          console.log(twoot.content)
          followersTwoots.push(twoot)
        }
      })
    })

    commit('setTwoots', twoots)
    commit('setFollowingList', list)
    commit('setFollowersTwoots', followersTwoots)
  
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
}

const mutations = {
  setTwoots : (state, twoots) => (state.twoots = twoots),
  setFollowingList : (state, followingList) => (state.followingList = followingList),
  setFollowersTwoots : (state, followersTwoots) => (state.followersTwoots = followersTwoots)
}

export default {
  state,
  getters,
  actions,
  mutations
}