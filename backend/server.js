const express = require('express');
const Url = require('./src/models/Url');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');
const path = require('path');

const {server, app, io} = require("./app.js")

const PORT = process.env.PORT || 3000;

//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, '../web-frontend/')));

const { MONGO_HOST } = require("./settings")

// Connect to MongoDB (Make sure you have a MongoDB instance running)
mongoose.connect(`mongodb://${MONGO_HOST}/progressbar`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/bar/:unique_id',(req,res)=> {
  res.sendFile(path.join(__dirname,'../web-frontend/index.html'));
 });

app.get('/static/*',(req,res)=> {
  res.sendFile(path.join(__dirname,'../web-frontend',req.params[0]));
 });


app.get('*', function(req, res) {
  console.log(req.path);
  return res.status(404).json({ error: 'URL not found' });
});


// WebSocket connection
io.on('connection', (socket) => {
  socket.on('subscribe', async (uniqueUrl) => {
    socket.join(uniqueUrl);
    const updatedUrl = await Url.findOne({ unique_id: uniqueUrl });
    io.to(updatedUrl.unique_id).emit('update', updatedUrl);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
