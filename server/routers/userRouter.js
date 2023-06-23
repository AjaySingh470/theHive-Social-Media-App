const router = require('express').Router();

const UserController = require('../controllers/userController')
const requireUser = require('../middleware/requireUser')
router.post('/follow',requireUser,UserController.followUser);
router.get('/getFeedData',requireUser,UserController.getPostsofFollowing);
router.get('/myposts',requireUser,UserController.getMyposts);
router.get('/userPosts',requireUser,UserController.getUserPost);
router.get('/getMyInfo',requireUser,UserController.getMyInfo);
router.delete('/',requireUser,UserController.deleteMyProfile);
router.put('/',requireUser,UserController.updateProfile);
router.post('/getUserProfile' , requireUser , UserController.getUserProfile);

module.exports = router;