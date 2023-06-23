const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { error } = require('../utils/responseWrapper');
require("dotenv").config();

module.exports = async (req,res,next) =>{
    if( !req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
    {
        // res.status(401).send("Authorization header is required!!!!");
        return res.send(error(401,'Authorization header is required!!!!!!'));
    } 
    const accessToken = req.headers.authorization.split(" ")[1];
    
    try{
        const decode =await jwt.verify(accessToken , process.env.TOKEN_KEY);
        console.log(accessToken);
        req._id = decode._id;
        const user =await Users.findById(req._id);
        if(!user)
        {
            res.send(error(404,"User Not Found"))
        }
        console.log("here in middleware");
        next(); 
    }
    catch(err){
        console.log(err)
        return res.send(error(401,"requser  "+err.message));
    }
    
}