const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB (Make sure you have a MongoDB instance running)
mongoose.connect('mongodb://127.0.0.1/progressbar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', apiRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  socket.on('subscribe', (uniqueUrl) => {
    socket.join(uniqueUrl);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
