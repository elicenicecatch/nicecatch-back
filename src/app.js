const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { router } = require('./routes');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { getToken } = require('./middlewares');
require('dotenv').config();
require('./passport')();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // client 요청시 쿠키 -> req.cookies로 접근 가능
app.use(passport.initialize());
app.use(getToken);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('📖MongoDB connected');
});

app.use('/api', router);

// eslint-disable-next-line
app.use((error, req, res, next) => {
  res.status(400).json({ error: error.message });
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
