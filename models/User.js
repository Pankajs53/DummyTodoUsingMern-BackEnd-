// import mongoose, { Schema } from "mongoose";
const mongoose = require("mongoose");
const Todo = require("./todo");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    todo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }],
})


module.exports = mongoose.model("User", userSchema);
