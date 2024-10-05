const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');



const videoRoutes = require('./routes/video');
const commentRoutes = require('./routes/comment');


const app = express()
app.use(express.json());
app.use(cors())



mongoose.connect(process.env.Mongo_Uri)
.then(()=>{
    console.log('Mongodb connected')
}).catch((err)=>{
    console.log(err)
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);


app.listen(7000, ()=>{
    console.log(`Server is running`)
})

