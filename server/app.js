require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/')
const cors = require('cors')
const app = express()
const db = mongoose.connection
const port = process.env.PORT || 3000

// mongoose.connect('mongodb://localhost:27017/live-code-local')
mongoose.connect(`mongodb://${process.env.USERDB}:${process.env.PASSWORDDB}@ds115963.mlab.com:15963/live-code-phase-2-week-4`)


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`database connected`)
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', routes)
app.listen(port, function(){
    console.log(`Running on port ${port}`)
})

module.exports = app
