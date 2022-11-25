require('dotenv').config();
const express = require("express");
const mongoose=require('mongoose');
const cors=require('cors');
const connectDB =require('./db/connectDB');

connectDB(process.env.MONGO_URI);

const app = express();
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());


mongoose.connection.once('open',()=>{
    app.listen(process.env.PORT,console.log("Listening..."));
})
