const router = require('express').Router();
const postsContoller = require('../controllers/postsController')
const requireUser = require('../middleware/requireUser')

//
router.get('/all',requireUser,postsContoller.getAllPostControler);
router.post('/',requireUser,postsContoller.createPost);
router.post('/like',requireUser,postsContoller.likeAndUnlikePosts)
router.put('/updatePost',requireUser,postsContoller.updatePost);
router.delete('/',requireUser,postsContoller.deletePost);
///
module.exports = router;
