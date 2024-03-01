const router=require('express').Router();
const {registerUser,loginUser,checkPassword, getUser, updateUser}=require('../controller/authController');
const {auth}=require('../services/verifyToken');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/checkPassword',auth,checkPassword);
router.post('/updateUser',auth,updateUser);
router.get('/getUser',auth,getUser);

module.exports=router;