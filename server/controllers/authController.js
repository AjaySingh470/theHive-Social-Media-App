const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const {error, sucess } = require('../utils/responseWrapper')
const signupController = async(req,res)=>{
    try{
        const { email,password,username } = req.body; 
        if(!email || !password || !username)
        {
            return res.send(error(401,"Error : All Fields are required!!!!!"));
        }
        const oldUser = await User.findOne({email});
        if(oldUser)
        {
            res.send(error(409,"User Already Exist!!!"))
            // 
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password : hashedPassword,
        })
        console.log("singup contoller")
        // const newuser = await User.findById(user._id);
        return res.send(sucess(200,
            "User is Created!!!"
        ));
    }
    catch(err){
        res.send(error(500,err.message));
    }
}
const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            // return res.status(400).send("All feilds are required");
            return res.send(error(400,"all fields are required!!!!"));
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.send(error(404,"user not registerd"));
        }
        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword)
        {
            return res.send(error(403,"Incorrect Password!!!"));
        }
        const accessToken = generateAccessToken({
            _id : user._id,
        });
        const refreshtoken = generateRefreshToken({
            _id : user._id,
        })
        res.cookie('jwtt',refreshtoken,{
            httpOnly : true,
            secure : false
        })
        return res.send(sucess(200,{
            accessToken ,
            user,
           
        }))
    }
    catch(err){
        console.log(err);
    }
}
// LOGOUT
const logoutContoller = async(req,res)=>{
    try {
        res.clearCookie('jwtt',refreshtoken,{
            httpOnly : true,
            secure : true
        });
        return res.send(sucess(200,
           "Logged Out"
        ));
    } catch (e) {
        return res.send(error(401,e.message))
    }
}
// this api will check the validity of refreshtokenand generate a new access token
const RefreshAccessTokenControl = async(req,res) =>{
        
        const cookies = req.cookies;
        if(!cookies.jwtt)
        {
            // res.status(401).send("Refresh Token is Required!!!");
            res.send(error(401,"Refresh Token is Required!!!!!"))

        }
        const refreshToken = cookies.jwtt;

        if(!refreshToken)
        {
            res.send(error(401,"Access Token is Required!!!!!"))
        }
        try{
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_KEY
            )
            const id = decoded._id;
            const accessToken = generateAccessToken({id});
            res.send(sucess(201,{
                accessToken,
            }));
        }
        catch(err)
        {
            console.log(err);
            res.send(error(401,"Invalid Access Key!!!!!!!"));
        }
}

const generateAccessToken = (data)=>{
    try{
        const token =  jwt.sign(data,process.env.TOKEN_KEY,{
            expiresIn : '20d'
        });
    console.log("Acess Token")
    return token;
    }
    catch(err)
    {
        console.log(err);
    }
   
}

const generateRefreshToken = (data) => {
    try{
        const token = jwt.sign(data,process.env.REFRESH_TOKEN_KEY,{
            expiresIn : '20d'
        })
        console.log("Refresh token");
        return token;
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    loginController,
    signupController,
    RefreshAccessTokenControl,
    logoutContoller
}