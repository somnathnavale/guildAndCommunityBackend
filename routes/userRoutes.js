const express=require('express');
const { createUser , login, logout, refresh, updateUser, getAllUsers, getUser} = require('../controllers/userControllers');
const verifyJWT=require('../middlewares/verifyJWT');

const router=express();

router.post('/login',login);
router.get('/logout',logout);
router.get('/refresh',refresh);

router.get('/user',verifyJWT,getAllUsers);
router.post('/user',createUser);
router.get('/user/:id',verifyJWT,getUser);
router.put('/user/:id',verifyJWT,updateUser);

module.exports=router;