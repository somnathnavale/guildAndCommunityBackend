const mongoose=require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, 
  author: String,
  description:  String,
  likes:{
    type:Number,
    default:0
  },
  tags:[{type:String}],
  comments:[{
    user:String,
    comment:String,
  }]
}, { timestamps: true });

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;
