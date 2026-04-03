const mongoose = require("mongoose");
const { type } = require("node:os");

const IdSchema = new mongoose.Schema({
  name : {
    type : String
  },
  rollNo : {
    type : Number,
    unique : true,
    sparse : true
  },
  grade : {
    type : String
  },
  father : {
    type : String
  },
  mother : {
    type : String
  },
  contactNo : {
    type : Number
  },
  photoUrl : {
    type : String
  }
})


const IdCard = mongoose.model("IdCard",IdSchema);

module.exports = IdCard;