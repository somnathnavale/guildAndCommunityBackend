const  mongoose = require("mongoose");

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    when:{
        type:String,
        required:true
    },
    where:{
        type:String,
        required:true
    },
    meetLink:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    conductedBy:{
        type:String,
        required:true
    }
});

const Event=mongoose.model('event',eventSchema);

module.exports=Event;