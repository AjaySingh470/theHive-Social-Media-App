

const router = require('express').Router();

const authContoller = require('../controllers/authController')

router.post('/signup' , authContoller.signupController);
router.post('/login' , authContoller.loginController);
router.get('/refresh',authContoller.RefreshAccessTokenControl);
router.post('/logout',authContoller.logoutContoller);
module.exports = router;