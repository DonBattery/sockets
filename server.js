// an example app demonstrating the usage of the logger middleware

'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = (process.argv[2] || 8080);
const serverName = (process.argv[3] || 'Test');

const logger = require('endpointz').reqLog;
const serverLog = require('endpointz').serverLog;
const startMessage = require('endpointz').startMessage;

const path = require('path');

let names = ['Sanyi', 'Józsi', 'Gazsi', 'Béla', 'Ronáld'];
let users = [];


app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  users.push({ID : socket.id, name : names[Math.floor(Math.random()*names.length)]});
  console.log('New user: ', users[users.length -1]);
  console.log(users);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(PORT, startMessage(serverName, PORT));
