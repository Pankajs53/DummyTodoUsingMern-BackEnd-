// import {express} from "express";

const express = require("express");
const router = express.Router();

// import the controllers
const {signup,logIn} = require("../controllers/Auth");
const {createTodo,deleteTodo} = require("../controllers/Todo");

// middelwares
const {verifyToken} =  require("../middelware/verifyToken");

// map the routes with controller
router.post("/signup",signup);
router.post("/logIn",logIn);
router.post("/createTodo",verifyToken,createTodo);
router.delete("/deleteTodo",verifyToken,deleteTodo);

// import the routers
module.exports = router;