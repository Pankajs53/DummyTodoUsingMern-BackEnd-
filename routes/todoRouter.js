// import {express} from "express";

const express = require("express");
const router = express.Router();

// import the controllers
const {signup,logIn} = require("../controllers/Auth");

// map the routes with controller
router.post("/signup",signup);
router.post("/logIn",logIn)

// import the routers
module.exports = router;