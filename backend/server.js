const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http');
require('dotenv').config();
const socketIO = require('socket.io');

const Video = require('./models/video'); // Your video model
const videoRoutes = require('./routes/video');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

// Create HTTP server and Socket.IO server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Adjust this for frontend
//     methods: ['GET', 'POST'],
//   },
// });

app.set('socketio', io)

mongoose.connect(process.env.Mongo_Uri).then(() => {
  console.log('Connected to MongoDB');

  // Check if the collection is empty
  return Video.countDocuments({});
}).then(async (count) => {
  if (count === 0) {
      console.log('Videos collection is empty, populating data');
      
      // Path to your JSON file
      const filePath = path.join(__dirname, 'db.json');
      
      // Read the data from the JSON file
      const videoData = JSON.parse(fs.readFileSync(filePath, 'utf-8')).videos;

      // Insert the data into the collection
      await Video.insertMany(videoData);
      
      console.log('Videos data inserted successfully');
  } else {
      console.log('Videos collection already has data, no need to populate.');
  }
}).catch(err => {
  console.error('Error connecting to MongoDB or inserting data:', err);
});





// // Socket.IO logic
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('new_comment', (comment) => {
//     io.emit('receive_comment', comment); // Broadcast new comment to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);





server.listen(7000, () => {
  console.log(`Server is running`);
});
