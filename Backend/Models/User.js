const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  index: {
    type:String
  },
  doc_no :{
    type: Number,
    default:0
  }
})
module.exports = mongoose.model('User', userSchema)