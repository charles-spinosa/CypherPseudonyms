const express = require('express');
const ws = require('ws');

const gameEngine = require('../../src/gameEngine');
const getGameStateMessageParser = require('./serverGameStateMessageParserFactory');

const appServer = express();
// sets up a "headless" (what does headless mean: that the ws server doesn't come attached to an http/s one. so a single http/s could manage multiple ws servers) server that prints any events that come in
const wsServer = new ws.Server({noServer: true});

let game = new gameEngine.CypherBoard();

// one of my issues with a boundMessageParser is that it creates new method objects for every connection, rather than attaching a single method to all connections
// it seems like a single function will be hard, as my intended behavior here is to respond to a *specific* connection with a data payload, but the cb involved doesn't get passed the connection.
// that being said, the connection is within scope.
wsServer.on('connection', socket => {
  const gameStateMessageParser = getGameStateMessageParser(socket, game, wsServer);
  socket.on('message', gameStateMessageParser);
});

// 'server' returned by express app.listen() is a vanilla js server object, so we can use upgrade process described in ws docs

const server = appServer.listen(port = 8080, () => {
  console.log('Cypher Pseudonyms RESTful API listening on port ' + port);
});

// when the server receives an update request, take the socket (which has a empty/removed 'data' event listener) and 
server.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, socket => {
    wsServer.emit('connection', socket, req);
  })
});

module.exports = server;