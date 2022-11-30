const Event=require('../models/eventModel');

const addEvent=async(req,res)=>{
    if(req.user.role!=='manager')
        return res.status(400).json({message:"unauthorised access"});
    try {
        const event=new Event(req.body);
        await event.save();
        res.status(201).json({message:"event created successfully",event});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

const updateEvent=async(req,res)=>{
    if(req.user.role!=='manager')
        return res.status(400).json({message:"unauthorised access"});
    try {
        const event=await Event.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!event)
            return res.status(400).json({message:"no event with given id"});
        res.status(200).json({message:"Event updated successfully",event});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

const deleteEvent=async(req,res)=>{
    if(req.user.role!=='manager')
        return res.status(400).json({message:"unauthorised access"});
    try {
        const event=await Event.findByIdAndDelete(req.params.id);
        if(!event)
            return res.status(400).json({message:"no event with given id"});
        res.status(200).json({message:"Event deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});   
    }
}

const getEvent=async(req,res)=>{

    try {
        const event=await Event.findById(req.params.id);
        if(!event)
            return res.status(400).json({message:"no event with given id"});
        res.status(200).json({event});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});   
    }
}

const getAllEvents=async(req,res)=>{
    try {
        const events=await Event.find({});
        res.status(200).json({events});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

module.exports={getEvent,getAllEvents,addEvent,updateEvent,deleteEvent};