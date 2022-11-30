const express=require('express');
const { createUser , login, logout, refresh, updateUser, getAllUsers, getUser} = require('../controllers/userControllers');
const verifyJWT=require('../middlewares/verifyJWT');

const router=express.Router();

router.post('/login',login);
router.get('/logout',logout);
router.get('/refresh',refresh);

router.get('/',verifyJWT,getAllUsers);
router.post('/',createUser);
router.get('/:id',verifyJWT,getUser);
router.put('/:id',verifyJWT,updateUser);

module.exports=router;