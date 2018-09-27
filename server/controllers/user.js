const User = require('../models/User')
const { sign } = require('../helpers/jwt')
const { encrypt, decrypt } = require('../helpers/hash')
const Status = require('../models/Status')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
  signup: function (req, res) {
    if (req.body.password < 6) {
      res.status(401).json({
        message: 'Password harus lebih dari 6 karakter'
      })
    } else {
      let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: encrypt(req.body.password)
      })
      newUser
        .save()
        .then(newUserDb => {
          res.status(200).json({
            message: 'Berhasil Daftar',
            data: newUserDb
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err
          })
        })
    }
  },
  signin: function (req, res) {
    let where = {}
    if (req.body.username) {
      where.username = req.body.username
    } else if (req.body.email) {
      where.email = req.body.email
    }
    let password = req.body.password
    let dataUser
    User.findOne(where).populate('following').populate('followers').populate('status')
      .then(user => {
        dataUser = user
        let hashPassword = user.password
        if (decrypt(password, hashPassword)) {
          return Status.find({
            user: ObjectId(user._id)
          })
        } else {
          res.status(404).json({
            message: 'Email/Username atau password salah'
          })
        }
      })
      .then(statusUser => {
        dataUser.status = statusUser
        return sign({
          _id: dataUser._id,
          email: dataUser.email
        })
      })
      .then(token => {
        res.status(200).json({
          token: token,
          name: dataUser.name,
          username: dataUser.username,
          email: dataUser.email,
          followers: dataUser.followers,
          following: dataUser.following,
          myTweets: dataUser.status
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}