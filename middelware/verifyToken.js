require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.verifyToken = async(req,res,next) => {
    try{
        const token = req.cookies.token || req.body.token ;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not Available"
            });
        }

        // lets verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_KEY);
            console.log("FROM PAYLOAD->",payload);

            req.user = payload;
        }
        catch(error){
            console.log("ERROR IN VERIFYING THE TOKEN");
            console.log(error)
            return res.status(420).json({
                success:false,
                message:"Token is invalid"
            });
        }
        next();
    }
    
    catch(error){
        console.log("Error occured in Auth Middelware");
        console.log("Error is->",error.message);
        res.status(505).json({
            success:false,
            message:"Error occured in Auth Middelware"
        })
    }
} 