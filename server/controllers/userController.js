const Posts = require('../models/Posts');
const Users = require('../models/Users');
const User = require('../models/Users');
const cloudinary = require('cloudinary').v2;
const {error, sucess} = require('../utils/responseWrapper');
const {mapPostOutput} = require('../utils/Utils')
const followUser =async  (req,res)=>{
    try {
        
        const {userIdtoFollow} = req.body;
        const currUserId = req._id;
        const usertoFollow =await User.findById(userIdtoFollow);
        const currUser =await User.findById(currUserId);
       
        if(!usertoFollow)
        {
            res.send(error(404, "User to Follow not Found!!!!!"));
        }
        // console.log(currUser);
        if(currUser.followings.includes(userIdtoFollow))
        {
            const index = currUser.followings.indexOf(userIdtoFollow);
            currUser.followings.splice(index,1);
    //
            const followerIndex = usertoFollow.followers.indexOf(currUser);
            usertoFollow.followers.splice(followerIndex,1);
    //
           
        }
        else{
            usertoFollow.followers.push(currUserId);
            currUser.followings.push(userIdtoFollow); 
            //
            //
            
        }
        await usertoFollow.save();
        await currUser.save();
        return res.send(sucess(201,{user : usertoFollow}));
    } catch (e) {
        res.send(error(401,e.message));
    }

}

const getPostsofFollowing = async (req,res)=>{
    try {
        
        const userId = req._id;
        const currUser =await User.findById(userId).populate('followings');
        const fullPosts = await Posts.find({
            'owner' : {
                '$in' : currUser.followings,
            }
        }).populate('owner');

        const posts = fullPosts.map(item => mapPostOutput(item , req._id)).reverse();

        const allFollowings = currUser.followings.map(item => item._id);
        allFollowings.push(req._id);
        const suggestions = await Users.find({
            _id : {
                '$nin' : allFollowings
            }
        }) 

        res.send(sucess(200,{
            ...currUser._doc , suggestions , posts , allFollowings
        }));
    } catch (e) {
        res.send(error(401,e.message));
    }
}
const getMyposts = async(req,res)=>{
    try {
        const ownerId = req._id;
        const allUserPosts = await Posts.find({
            owner : ownerId
        }).populate('likes');
        res.send(sucess(200,{allUserPosts}));
    } catch (e) {
        res.send(error(401,e.message));
    }
}
const getUserPost = async(req,res)=>{
    try {
        const userId = req.body.userId;
        if(!userId)
        {
            res.send(error(401,e,message));
        }
        const allUserPosts = await Posts.find({
            owner : userId
        }).populate('likes');
        res.send(sucess(200,{allUserPosts}));
    } catch (e) {
        res.send(error(401,e.message));
    }
}
const deleteMyProfile = async (req,res)=>{
    try {
        const userId = req._id;
        const currUser = await Users.findById(userId);
        await Posts.deleteMany({
            owner : userId
        })
        // followers
        currUser.followers.forEach(async(followerId) => {
            const follower = await Users.findById(followerId);
            const index = follower.followings.indexOf(userId);
            follower.followings.splice(index,1);
            follower.save();
        });
        // followings
        currUser.followings.forEach(async(followingId) => {
            const following = await Users.findById(followingId);
            const index = following.followers.indexOf(userId);
            following.followers.splice(index,1);
            following.save();
        });
        // likes 
        const allPosts = await Posts.find();
        allPosts.forEach(async (post) =>{
            const index = post.likes.indexOf(userId);
            post.likes.splice(index,1);
            await post.save();
        })
        // delete User
        await currUser.remove();
        res.clearCookie('jwt',{
            httpOnly : true,
            secure : true
        })
        res.send(sucess(200,"User Deleted"));

    } catch (e) {
        res.send(error(401,e.message));
    }
}

const getMyInfo = async(req,res)=>{
    try {
        const user = await User.findById(req._id);
        return res.send(sucess(200,{user}));
    } catch (e) {
        return res.send(error(401,"getmyinfo" + e.message));
    }
}

const updateProfile = async(req,res)=>{
    try {
        const user = await User.findById(req._id);
        console.log("update in process");
        const {name,bio,userImg} = req.body;
        if(name)
        user.username = name;
        if(bio)
        user.bio = bio;
        if(userImg)
        {
            const cloudImg = await cloudinary.uploader.upload(userImg, {
                folder: "profileImg",
            });
            user.avatar = {
                url: cloudImg.secure_url,
                publicId: cloudImg.public_id,
            };
        }
        
        await user.save();
        return res.send(sucess(200,"User Updated!!!"))

    } catch (e) {
        return res.send(error(401, e.message));
    }
}

const getUserProfile = async (req,res)=>{
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId).populate({
            path : 'posts', 
            populate : {
                path : 'owner',

            }
        });
        const fullPosts = user.posts;
        console.log(fullPosts);
        const posts = fullPosts.map((item) => mapPostOutput(item , req._id)).reverse();

        return res.send(sucess(200 , {...user._doc , posts}))

    } catch (e) {
        console.log("error hai " , e);
        return res.send(error(500,e.message));
    }
}

module.exports = {
    followUser,
    getPostsofFollowing,
    getMyposts,
    getUserPost,
    deleteMyProfile,
    getMyInfo,
    updateProfile,
    getUserProfile
}