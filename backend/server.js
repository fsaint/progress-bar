const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const apiRoutes = require('./routes/api');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, '../web-frontend/')));



// Connect to MongoDB (Make sure you have a MongoDB instance running)
mongoose.connect('mongodb://127.0.0.1/progressbar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/static/*',(req,res)=> {
  res.sendFile(path.join(__dirname,'../web-frontend',req.params[0]));
 });


app.get('*', function(req, res) {
  console.log(req.path);
  return res.status(404).json({ error: 'URL not found' });
});


// WebSocket connection
io.on('connection', (socket) => {
  socket.on('subscribe', (uniqueUrl) => {
    socket.join(uniqueUrl);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
