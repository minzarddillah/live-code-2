<template>
  <div class="col-lg-3">
  <div class="card  mb-3" style="max-width: 18rem;" v-if="$store.state.token">
    <div class="card-body who-to-follow">
      <h5 class="card-title">Who to Follow <small><a href="#" @click="getUser">Refresh</a></small></h5>
      <ul id="recently-followed">
        <li v-for="(user, index) in users" :key="index" v-if="'@'+user.username !== $store.state.username">
          <div class="media ">
            <img class="d-flex mr-3 rounded-circle" :src="`https://api.adorable.io/avatars/285/${user.username}`"
              alt="">
            <span class="media-body twit-status">
              <h6 class="mt-0">{{ user.name }} <small>@{{ user.username }}</small></h6>
              <span v-if="user.followers.length === 0">
                <button class="btn btn-outline-info" @click="follow(user._id)">Follow</button>
              </span>
              <span v-else v-for="(followersUser, index) in user.followers" :key="index">
                <button v-if="followersUser.username === $store.state.username" class="btn btn-outline-info" @click="follow(user._id)">Follow</button>
                <button v-else @click="follow(user._id)" class="btn btn-danger">Unfollow</button>
              </span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      axios({
        url: 'http://localhost:3000/user'
      })
        .then(({ data }) => {
          this.users = data
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    },
    follow (id) {
      axios({
        url: `http://localhost:3000/user/${id}/follow`,
        method: 'patch',
        headers: {
          'token': this.$store.state.token
        }
      })
        .then(({ data }) => {
          this.getUser()
          this.store.dispatch('getProfile')
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    }
  }
}
</script>

<style>

</style>
