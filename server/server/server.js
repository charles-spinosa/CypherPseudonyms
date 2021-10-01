const express = require('express');
const ws = require('ws');

const appServer = express();

// sets up a "headless" (what does headless mean: that the ws server doesn't come attached to an http/s one. so a single http/s could manage multiple ws servers) server that prints any events that come in
const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
  socket.on('message', message => console.log({message}))
});

// 'server' returned by express app.listen() is a vanilla js server object, so we can use upgrade process described in ws docs

const server = appServer.listen(8080);
server.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  })
})