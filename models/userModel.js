const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        lowercase:true,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["admin","user",'manager']
    },
    blogCount:{
        type:Number,
        default:0
    },
    points:{
        type:Number,
        default:0
    },
    communities:[
        {
            name:{
                type:String,
                required:true
            },
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Guild"
            }
        }
    ]
})

const User=mongoose.model('user',userSchema);

module.exports=User;