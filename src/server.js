const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  

//cors
const cors = require('cors');
app.use(cors());

// Xử lý khi một client kết nối
io.on('connection', (socket) => {
  console.log('Client connected');

  // Xử lý khi client gửi một message
  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Gửi message đã nhận cho tất cả client khác
    socket.broadcast.emit('message', data);
  });

  // Xử lý khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const run = (socket) => {
  socket.on('user-join', function(data){
    socket.emit('greeting', 'Hello from Socket.IO ' + data);
  })
};

io.on('connection', run);

// Khởi động server
const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
