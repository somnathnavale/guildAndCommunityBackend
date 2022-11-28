require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const guildRoutes = require('./routes/guildRoutes');
const communityRoutes = require('./routes/communityRoutes');
const activityRoutes = require('./routes/activityRoutes');

connectDB(process.env.MONGO_URI);

const app = express();
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());
app.use('/guild', guildRoutes);
app.use('/guild', communityRoutes);
app.use('/guild', activityRoutes);


mongoose.connection.once('open',()=>{
    app.listen(process.env.PORT, console.log("Listening..."));
})
