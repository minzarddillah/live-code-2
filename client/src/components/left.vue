<template>
  <div class="col-lg-3">
    <div class="twPc-div" v-if="$store.state.token">
      <a class="twPc-bg twPc-block bg-info"></a>
      <div>
        <a title="Mert S. Kaplan" href="https://twitter.com/mertskaplan" class="twPc-avatarLink">
          <img alt="Mert S. Kaplan" src="https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg"
            class="twPc-avatarImg">
        </a>

        <div class="twPc-divUser">
          <div class="twPc-divName">
            <a href="https://twitter.com/mertskaplan">{{ $store.state.name }}</a>
          </div>
          <span>
            <a href="https://twitter.com/mertskaplan"><span>{{ $store.state.username }}</span></a>
          </span>
        </div>

        <div class="twPc-divStats">
          <ul class="twPc-Arrange">
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan" title="9.840 Tweet">
                <span class="twPc-StatLabel twPc-block">Tweets</span>
                <span class="twPc-StatValue">{{ totalPost }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan/following" title="885 Following">
                <span class="twPc-StatLabel twPc-block">Following</span>
                <span class="twPc-StatValue">{{ followings.length }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan/followers" title="1.810 Followers">
                <span class="twPc-StatLabel twPc-block">Followers</span>
                <span class="twPc-StatValue">{{ followerss.length }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <center v-if="$store.state.token">
      <button class="btn-info" @click="myTweets">My Tweets</button>
      <button class="btn-info" @click="allTweets">All Tweets</button>
    </center>

    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <input type="text" placeholder="Search..." v-model="inputTweet">
        <button class="btn-info" @click="search">Search</button>
      </div>
    </div>
    <div class="card  mb-3" style="max-width: 18rem;" v-if="$store.state.token">
      <div class="card-body">
        <h5 class="card-title">Recently Followed</h5>
        <ul id="recently-followed">
          <li v-for="(userFollow, index) in $store.state.following" :key="index">
            <a href="#">{{ userFollow.username }}</a>
          </li>
        </ul>
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
      totalPost: 0,
      inputTweet: '',
      followerss: [],
      followings: []
    }
  },
  watch: {
    ...mapState(['isLogin', 'tweets', 'followers', 'following'])
  },
  computed: {
    isLogin () {
      this.loginStatus = this.$store.state.isLogin
      let tweets = this.$store.state.tweets
      let post = 0
      tweets.forEach(tweet => {
        if ('@'+tweet.user.username === this.$store.state.username) {
          post++
        }
      })
      this.totalPost = post
    },
    followers () {
      this.followerss = this.$store.state.followers
    },
    following () {
      this.followings = this.$store.state.following
    }
  },
  methods: {
    search () {
      axios({
        url: 'http://localhost:3000/status/search',
        method: 'post',
        data: {
          keyword: this.inputTweet
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('searchTweet', data)
          this.inputTweet = ''
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    },
    myTweets () {
      this.$store.dispatch('myTweets')
    },
    allTweets () {
      this.$store.dispatch('getTweet')
    }
  }
}
</script>

<style>

</style>
