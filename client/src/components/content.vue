<template>
  <div class="col-lg-6">

    <div class="row" v-if="loginStatus">
      <div class="col-lg-12 col-md-12 mb-12 form-horizontal">
        <div class="form-group">
          <textarea class="form-control" placeholder="What's happening?" rows="3" v-model="status"></textarea>
        </div>
        <div class="form-group">
          <button class="btn-info" @click="postTweet">Post</button>
        </div>
      </div>
    </div>
    <hr>

    <div class="row">
      <div class="col-lg-12 col-md-12 timeline-wrapper" v-for="(tweet, index) in post" :key="index">
        <div class="media ">
          <img class="d-flex mr-3 rounded-circle" :src="`https://api.adorable.io/avatars/285/${tweet.user.username}`"
            alt="">
          <span class="media-body twit-status">
            <h5 class="mt-0">{{ tweet.user.name }}</h5>
            <p>@{{ tweet.user.username }}</p>
            {{ tweet.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      loginStatus: false,
      post: [],
      status: ''
    }
  },
  watch: {
    ...mapState(['isLogin', 'tweets'])
  },
  computed: {
    isLogin () {
      this.loginStatus = this.$store.state.isLogin
    },
    tweets () {
      this.post = this.$store.state.tweets
    }
  },
  methods: {
    getTweet () {
      this.$store.dispatch('getTweet')
    },
    postTweet () {
      axios({
        url: 'http://localhost:3000/status',
        method: 'post',
        data: {
          status: this.status
        },
        headers: {
          token: this.$store.state.token
        }
      })
        .then(({ data }) => {
          this.getTweet()
          this.status = ''
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    }
  },
  created () {
    this.getTweet()
  }
}
</script>

<style>

</style>
