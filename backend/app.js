
const express = require('express');
const socketIo = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);



module.exports = { app, io, server };

