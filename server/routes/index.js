const router = require('express').Router()
const { signin, signup } = require('../controllers/user')
const User = require('../models/User')
const status = require('./status')
const { authen } = require('../helpers/auth')
const { verify } = require('../helpers/jwt')
const ObjectId = require('mongoose').Types.ObjectId
const Status = require('../models/Status')

router.post('/signup', signup)
router.post('/signin', signin)
router.use('/status', status)
router.get('/user', (req, res) => {
  User
  .find()
  .then(users => {
    let rand = Math.floor(Math.random() * users.length)
      User
        .find()
        .limit(5)
        .skip(rand)
        .populate('followers')
        .populate('following')
        .then(users => {
          res.status(200).json(users)
        })
    })
})
router.patch('/user/:id/follow', authen, (req, res) => {
  let userYangFollow
  // let userYangDiFollow
  let follow = false
  verify(req.headers.token)
    .then(decoded => {
      return User.findById(ObjectId(decoded._id))
    })
    .then(user => {
      userYangFollow = user
      return User.findById(ObjectId(req.params.id))
    })
    .then(user => {
      let udahFollow = false
      for (let i = 0; i < userYangFollow.following.length; i++) {
        if (String(user._id) === String(userYangFollow.following[i])) {
          udahFollow = true
        }
      }
      if (!udahFollow) {
        follow = true
        user.followers.push(ObjectId(userYangFollow._id))
        userYangFollow.following.push(ObjectId(user._id))
        return User.findByIdAndUpdate(ObjectId(user._id), user)
      } else {
        delete user.followers[user.followers.indexOf(ObjectId(userYangFollow._id))]
        delete userYangFollow.following[userYangFollow.following.indexOf(ObjectId(user._id))]
        user.followers = user.followers.filter(Boolean)
        userYangFollow.following = userYangFollow.following.filter(Boolean)
        return User.findByIdAndUpdate(ObjectId(user._id), user)
      }
    })
    .then(user => {
      return User.findByIdAndUpdate(ObjectId(userYangFollow._id), userYangFollow)
    })
    .then(user => {
      if (follow) {
        res.status(200).json({msg: 'berhasil follow'})
      } else {
        res.status(200).json({msg: 'berhasil unfollow'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/my-profile', (req, res) => {
  let dataUser
  verify(req.headers.token)
    .then(decoded => {
      return User.findById(ObjectId(decoded._id)).populate('following').populate('followers').populate('status')
    })
    .then(user => {
      dataUser = user
      return Status.find({
        user: ObjectId(user._id)
      })
    })
    .then(statusUser => {
      dataUser.status = statusUser
      res.status(200).json({
        name: dataUser.name,
        username: dataUser.username,
        email: dataUser.email,
        followers: dataUser.followers,
        following: dataUser.following,
        myTweets: dataUser.status
      })
    })
})

module.exports = router