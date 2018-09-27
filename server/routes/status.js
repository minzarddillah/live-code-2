const router = require('express').Router()
const { authen } = require('../helpers/auth')
const { verify } = require('../helpers/jwt')
const Status = require('../models/Status')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

router.post('/', authen, (req, res) => {
  let newStatus = new Status({
    status: req.body.status
  })
  let userDb
  verify(req.headers.token)
    .then(decoded => {
      newStatus.user = ObjectId(decoded._id)
      return User.findById(ObjectId(decoded._id))
    })
    .then(user => {
      userDb = user
      user.status.push(ObjectId(newStatus._id))
      return user.save()
    })
    .then(user => {
      return newStatus.save()
    })
    .then(status => {
      status.user = userDb
      res.status(200).json(status)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.get('/', (req,res) => {
  Status
    .find()
    .populate('user')
    .sort({createdAt: 'descending'})
    .then(status => {
      res.status(200).json(status)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.post('/search', (req, res) => {
  Status
    .find({
      status: { $regex: '.*' + req.body.keyword +'.*' }
    })
    .populate('user')
    .then(status => {
      res.status(200).json(status)
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

module.exports = router
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjN2EyNDJjNGU1ODMyYmEyNDI4YTEiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNTM4MDMyNjc4fQ.jbG5JlP5Fjc9uAAmeVi0mfFsn9LTYTKaoqLeOPPJKpQ