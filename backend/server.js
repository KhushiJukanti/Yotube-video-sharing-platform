const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');



const videoRoutes = require('./routes/video');
const commentRoutes = require('./routes/comment');


const app = express()
app.use(express.json());
app.use(cors())


// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust this for frontend
    methods: ['GET', 'POST'],
  },
});


mongoose.connect(process.env.Mongo_Uri)
.then(()=>{
    console.log('Mongodb connected')
}).catch((err)=>{
    console.log(err)
});


// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('new_comment', (comment) => {
      io.emit('receive_comment', comment); // Broadcast new comment to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);


app.listen(7000, ()=>{
    console.log(`Server is running`)
})

