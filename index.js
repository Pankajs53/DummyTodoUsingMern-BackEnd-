// import express from "express";
const express = require("express");
const cookieParser = require('cookie-parser');
// creted an server
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// add middelware to read the json file
app.use(express.json());
app.use(cookieParser());

// import the routes
const routes = require("./routes/todoRouter");

app.use("/api/v1",routes);


// connect with db
const dbConnect = require("./config/database");
dbConnect();


app.listen(PORT , (req,res) => {
    console.log(`<h1>Hello we have started working at port no : ${PORT}`)
});


