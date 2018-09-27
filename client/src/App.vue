<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Victwitter</a>
        <div class="header-right" v-if="!loginStatus">
          <input type="text" v-model="username" placeholder="username / email">
          <input type="password" v-model="password" placeholder="password">
          <button class="btn-info" @click="login">Login</button>
        </div>
        <div class="header-right" v-else>
          <button type="button" class="btn btn-primary" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
import email from 'email-validator'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      loginStatus: false
    }
  },
  watch: {
    ...mapState(['isLogin'])
  },
  computed: {
    isLogin () {
      this.loginStatus = this.$store.state.isLogin
    }
  },
  methods: {
    login () {
      let postData
      if (email.validate(this.username)) {
        postData = { email: this.username, password: this.password }
      } else {
        postData = { username: this.username, password: this.password }
      }
      axios({
        url: 'http://localhost:3000/signin',
        method: 'post',
        data: postData
      })
        .then(({ data }) => {
          this.username = ''
          this.password = ''
          this.$store.dispatch('login', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout () {
      this.$store.dispatch('logout')
      this.$store.dispatch('getTweet')
    }
  }
}
</script>
<style>
body {
  padding-top: 70px;
}

@media (min-width: 992px) {
  body {
    padding-top: 70px;
  }
}

.loginform input {
  float: left;
}

.twit-status h5 {
  float: left;
  margin-right: 5px;
}

.twit-status h6 {
  float: left;
  margin-right: 5px;

  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
  height: 1.2em;
  white-space: nowrap;

}

.twit-status button {
  border-radius: 20px;
  font-size: 15px;
  padding: 0 10px;
}

.twit-status p {
  color: grey;
}

.timeline-wrapper {
  border: 1px solid #17a2b8;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 10px;
}

#recently-followed {
  list-style-type: none;
  padding-left: 0;
}

.rounded-circle {
  width: 50px;
  height: 50px;
}

.who-to-follow ul li {
  margin-bottom: 20px;
}

/* profile menu */
.twPc-div {
    background: #fff none repeat scroll 0 0;
    border: 1px solid #e1e8ed;
    border-radius: 6px;
    height: 200px;
    max-width: 340px;
    margin-bottom: 10px;
}
.twPc-bg {
    /* background-image: url("https://pbs.twimg.com/profile_banners/50988711/1384539792/600x200");
    background-position: 0 50%;
    background-size: 100% auto; */
    border-bottom: 1px solid #e1e8ed;
    border-radius: 4px 4px 0 0;
    height: 95px;
    width: 100%;
}
.twPc-block {
    display: block !important;
}
.twPc-button {
    margin: -35px -10px 0;
    text-align: right;
    width: 100%;
}
.twPc-avatarLink {
    background-color: #fff;
    border-radius: 6px;
    display: inline-block !important;
    float: left;
    margin: -30px 5px 0 8px;
    max-width: 100%;
    padding: 1px;
    vertical-align: bottom;
}
.twPc-avatarImg {
    border: 2px solid #fff;
    border-radius: 7px;
    box-sizing: border-box;
    color: #fff;
    height: 72px;
    width: 72px;
}
.twPc-divUser {
    margin: 5px 0 0;
}
.twPc-divName {
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
}
.twPc-divName a {
    color: inherit !important;
}
.twPc-divStats {
    margin-left: 11px;
    padding: 10px 0;
}
.twPc-Arrange {
    box-sizing: border-box;
    display: table;
    margin: 0;
    min-width: 100%;
    padding: 0;
    table-layout: auto;
}
ul.twPc-Arrange {
    list-style: outside none none;
    margin: 0;
    padding: 0;
}
.twPc-ArrangeSizeFit {
    display: table-cell;
    padding: 0;
    vertical-align: top;
}
.twPc-ArrangeSizeFit a:hover {
    text-decoration: none;
}
.twPc-StatValue {
    display: block;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.15s ease-in-out 0s;
}
.twPc-StatLabel {
    color: #8899a6;
    font-size: 10px;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-transform: uppercase;
    transition: color 0.15s ease-in-out 0s;
}
</style>
