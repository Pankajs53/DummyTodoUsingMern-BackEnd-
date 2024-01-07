// import { Mongoose } from "mongoose";
const mongoose = require("mongoose");
const User = require("./User")

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        required:true,
    },
    importance:{
        type:String,
        enum:["Week","Mid","Strong"],
        required:true,
    },
    createdOn:{
        type:Date,
        default: Date.now,
    },
    updatedOn:{
        type:Date,
    }
})

module.exports = mongoose.model("Todo", todoSchema);


