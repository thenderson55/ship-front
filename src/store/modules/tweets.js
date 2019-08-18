const state = {
  tweets: [
    {
      id: 1,
      content: "kwjbfwbf"
    },
    {
      id: 2,
      content: "kwjbfwbfkwjbefkjbwkjfb"
    }
  ]
}

const getters = {
  allTweets: state => state.tweets
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}