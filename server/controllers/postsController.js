const {sucess, error} =require( '../utils/responseWrapper');
const Post = require('../models/Posts');
const User = require('../models/Users');
const cloudinary = require('cloudinary').v2;
const {mapPostOutput} = require('../utils/Utils')

const getAllPostControler = (req,res)=>{
    try{
        res.send(sucess(200,"here are posts"))
    }
    catch(err){
        console.log(err);
    }
}

const createPost = async (req,res)=>{
    try{
        const {caption , postImg} = req.body;
        const owner = req._id;
        if(!caption && !postImg)
        {
            return res.send(error(400 , "caption and post is required"));
        }
            const clouding = await cloudinary.uploader.upload(postImg , {
                folder : 'postImg' 
            })
        
        const user = await User.findById(owner);
        const post = await Post.create({
            caption,
            owner,
            image : {
                publicId : clouding.public_id,
                url : clouding.secure_url
            }
        })
        user.posts.push(post._id);
        console.log("post is crateed")
        await user.save();//
        return res.send(sucess(201,{post}));
    }
    catch(err){
        console.log(err);
        return res.send(error(500,err));
    }
}

const likeAndUnlikePosts =async (req,res)=>{
    try {
        
        const {postId} = req.body;
        var operation = "";
        const post = await Post.findById(postId).populate('owner');
        // console.log("idhar hu mai")
        if(!post)
        {
            res.send(error(404,'Post Not Found'));
        }
        const currUser = req._id;
        if(post.likes.includes(req._id))
        {
            const index = post.likes.indexOf(currUser);
            post.likes.splice(index,1);
            // await post.save();
            // operation = "Unliked Post"
        }
        else{
            post.likes.push(currUser);
            // operation = "Liked Post"
        }
        await post.save();
        return res.send(sucess(200,{post : mapPostOutput(post,req._id)}))
    } catch (err) {
        console.log(err.message)
        return res.send(error(500,err.message))
        
    }
}

const updatePost = async (req,res)=>{
    try {
        const {postId , caption} = req.body;
        const currUserId = req._id;
        const post = await Post.findById(postId);
        if(!post)
        {
            res.send(error(404,"Post Not Found"));
        }
        if(post.owner.toString() !==  currUserId)
        {
            return res.send(error(401,"Unauthorized User"));
        }
        
        if(caption) post.caption = caption;
        await post.save();
        return res.send(sucess(201,"Post Is Updated"));

    } catch (e) {
        res.send(error(500,e.message));
    }
}

const deletePost = async(req,res)=>{
    try { 
        const {postId} = req.body;
        const currUserId = req._id;
        const post = await Post.findById(postId);
        const currUser = await User.findById(currUserId);
        if(!post)
        {
            res.send(error(404,"Post Not Found"));
        }
        if(post.owner.toString() !==  currUserId)
        {
            return res.send(error(403,"Unauthorized User"));
        }
        const index = currUser.posts.indexOf(postId);
        currUser.posts.splice(index,1);
        await currUser.save();
        await post.remove();
        res.send(sucess(200,"Post Is Deleted!!!!"));
    } catch (e) {
        res.send(401,e.message);
    }


}
module.exports = {
    getAllPostControler,
    createPost,
    likeAndUnlikePosts,
    updatePost,
    deletePost
}
