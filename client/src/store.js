import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    isLogin: false,
    tweets: [],
    name: '',
    myTweets: [],
    followers: [],
    following: []
  },
  mutations: {
    loginMutation (state, data) {
      state.username = '@' + data.username
      state.token = data.token
      state.isLogin = true
      state.name = data.name
      state.followers = data.followers
      state.following = data.following
      state.myTweets = data.myTweets
    },
    logoutMutation (state) {
      state.name = ''
      state.username = ''
      state.token = ''
      state.isLogin = false
    },
    getTweetMutation (state, data) {
      state.tweets = data
    },
    searchTweetMutation (state, data) {
      state.tweets = data
    },
    myTweetsMutation (state) {
      state.tweets = state.myTweets
    },
    getProfileMutation (state) {
      axios({
        url: 'http://localhost:3000/my-profile',
        method: 'get',
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          alert(JSON.parse(data))
          console.log(data)
          state.username = '@' + data.username
          state.token = data.token
          state.isLogin = true
          state.name = data.name
          state.followers = data.followers
          state.following = data.following
          state.myTweets = data.myTweets
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    }
  },
  actions: {
    login (context, data) {
      context.commit('loginMutation', data)
    },
    logout (context) {
      context.commit('logoutMutation')
    },
    getTweet (context) {
      axios({
        url: 'http://localhost:3000/status'
      })
        .then(({ data }) => {
          context.commit('getTweetMutation', data)
        })
    },
    searchTweet (context, data) {
      context.commit('searchTweetMutation', data)
    },
    myTweets (context) {
      context.commit('myTweetsMutation')
    },
    getProfile (context) {
      context.commit('getProfileMutation')
    }
  }
})
