const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const express = require('express');
const path = require('path');

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  socket.on('selection', (msg) => {
    console.log('selection: ' + msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});