const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket io

io.on('connection', (socket) => {
  console.log('new user has connection', socket.id);
  socket.on('user-message', (message) => {
    console.log('A new User Message', message);
    io.emit('message', message);
  });
});

server.listen(9000, () => console.log('server start on port'));
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  return res.sendFile('/public/index.html');
});

console.log('onnnnnn');
