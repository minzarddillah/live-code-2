const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema({
  status: {
    type: String,
    required: [true, 'Status harus di isi']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})


const Status = mongoose.model('Status', statusSchema)

module.exports = Status