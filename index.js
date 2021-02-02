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

io.on('connection', async (socket) => {
  socket.on('selection', (selection) => {
    io.emit('selection', selection);
  });
  socket.on('playerCreated', () => {
    io.emit('playerCreated');
  })
});

http.listen(3000);