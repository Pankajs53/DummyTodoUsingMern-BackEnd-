// import mongoose from "mongoose";
const mongoose = require("mongoose");

// import the env files
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL).
    then (()=>{console.log("CONNECTED TO DB :)")})
    .catch ((error) =>{
        console.log("ERROR IN CONNECTING TO DB");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
