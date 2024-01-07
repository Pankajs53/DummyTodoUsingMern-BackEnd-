// Write routes from signup-> new account and login

const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


exports.signup =  async(req,res) => {
    try{
        // get the data from req body
        const {name,email,password} = req.body;
        // check if email already exits in DB
        const oldUser = await User.findOne({email});
        // if user already in DB send back response to login in
        if(oldUser){
            return res.status(301).json({
                success:false,
                message:"User Already Exits in Database"
            })
        }else{
            // hash the password
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            console.log("HashedPasswordIs->",hashedPassword)
            // create an object 
            const newuser = await User.create({name,email,password:hashedPassword});
            res.status(200).json({
                success:true,
                message:"ENTRY CREATED IN DB",
                data:newuser
            })
        }

    }catch(error){
        console.log("error in signup");
        console.log(error.message);
        res.status(200).json({
            success:false,
            message:"Unable to SIGN UP"
        })
    }
}

exports.logIn = async(req,res) => {
    try{
        // fetch the email and password from req.body
        const {email,password} = req.body;
        // check if email and password are not empty
        if(!email || !password){
            return res.statu(505).json({
                success:false,
                message:"Recheck email or Password"
            })
        }

        // check if user exits in DB or not
        let existUser = await User.findOne({email});
        if(!existUser){
            return res.status(503).json({
                success:false,
                message:"User Does not exits in DB"
            })
        } 

        // if exits compare password
        if(await bcrypt.compare(password,existUser.password)){
            // if password match -> create a token and send it within a cookie
            const payload = {
                email:existUser.email,
                todo:existUser.todo,
                id:existUser._id,
            }

            let token = jwt.sign(payload,process.env.JWT_KEY);

            existUser = existUser.toObject();
            existUser.token=token;
            existUser.password=undefined;

            let minute = 60*100;
            const options = {
                // expiresIn: new Date( Date.now() + 30000),
                httpOnly:true,
                maxAge:minute,
            }           

            return res.cookie("cookie->LoginIn",token,options).json({
                success:true,
                token,
                existUser,
                message:"User logged in"
            })

        }else{
            // password does not macth
            return res.status(509).json({
                success:False,
                message:"Password does not match"
            })
        }

    }catch(err){
        console.log("error occured in LOGIN IN");
        console.log(err);
        res.status(403).json({
            success:false,
            message:"Error while login"
        })
    }
}
