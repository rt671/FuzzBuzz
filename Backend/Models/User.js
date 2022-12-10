const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  index: {
    type:String
  }
})
module.exports = mongoose.model('User', userSchema)