const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// health check
app.get('/health', (req, res, next) => {
  res.json({
    status: 'OK',
  });
});

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('📖MongoDB connected');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.HOST}:${process.env.CLIENT_PORT}`,
    methods: ['GET', 'POST'],
  },
  // cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user id: ${socket.id} / room id: ${data}`);
  });

  socket.on('send_message', (data) => {
    console.log(`message data:`, data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

module.exports = server;
