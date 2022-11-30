const express=require('express');
const { getAllEvents, addEvent, updateEvent, deleteEvent, getEvent } = require('../controllers/eventControllers');
const verifyJWT=require('../middlewares/verifyJWT');

const router=express.Router();

router.get('/',verifyJWT,getAllEvents);
router.post('/',verifyJWT,addEvent);
router.get('/:id',verifyJWT,getEvent)
router.put('/:id',verifyJWT,updateEvent);
router.delete('/:id',verifyJWT,deleteEvent)

module.exports=router;