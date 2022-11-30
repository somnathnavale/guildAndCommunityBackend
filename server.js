require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const connectDB = require('./db/connectDB');

const guildRoutes = require('./routes/guildRoutes');
const allCommunitiesRoutes = require('./routes/allCommunitiesRoutes')
const blogRoutes=require('./routes/blogRoutes')
const userRoutes=require('./routes/userRoutes')
const eventRoutes=require('./routes/eventRoutes');

const app = express();
connectDB(process.env.MONGO_URI);
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));

app.use('/guild', guildRoutes);
app.use('/communities', allCommunitiesRoutes)
app.use('/user',userRoutes);
app.use('/blog',blogRoutes);
app.use('/event',eventRoutes);

mongoose.connection.once('open',()=>{
    app.listen(process.env.PORT, console.log("Listening..."));
})
