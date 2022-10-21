const mongoose = require("mongoose");
const {conn} = require("../database/db")
const userModel = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String,enum:['student','admin','teacher','superadmin']},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});
userModel.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = this.createdAt|| new Date();
    this.updatedAt = this.updatedAt|| new Date();
  } else {
    this.updatedAt = this.updatedAt|| new Date();
  }
  next();
});
module.exports = conn.model("users", userModel);