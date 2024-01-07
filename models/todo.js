// import { Mongoose } from "mongoose";
const mongoose = require("mongoose");
const User = require("./User")

const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Name:{
        type:String,
        require:true,
    },
    Description:{
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
        required:true,
    },
    updatedOn:{
        type:Date,
    }
})

module.exports = mongoose.model("Todo", todoSchema);


