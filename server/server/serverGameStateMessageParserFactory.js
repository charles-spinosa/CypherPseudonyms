const broadcastMessage = (wsServer, message) => {
  wsServer.clients.forEach(client => client.send(JSON.stringify(message)));
}

// generates a message listener bound to a specific game and socket. This listener translates ws message operations into game-engine updates
const messageParserFactory = (socket, game, wsServer) => message => {
  console.log('server receiving message');

  const request = JSON.parse(message.toString());

  // this might be the only operation that needs to go direct to the socket that responded, vs broadcasting to all
  // potentially full game state should be a REST? since it behaves outside of the atomic-update-parallel-game-engine thingy?
  if (request.operation === 'full-game-state') {
    const message = {
      operation: 'full-game-state',
      words: game.words, 
      activeTurn: game.activeTurn
    }
    socket.send(JSON.stringify(message));
  }
  else if (request.operation === 'reveal-card') {
    game.revealCard(request.index);

    const message = {
      operation: 'reveal-card', 
      index: request.index
    }
    broadcastMessage(wsServer, message);
  }
  else if (request.operation === 'reset-board') {
    // const newWords = makeDBRequestForWords();
    game.resetBoardWithNewWords();

    message = {
      operation: 'full-game-state',
      words: game.words,
      activeTurn: game.activeTurn
    }
    broadcastMessage(wsServer, message);
  }
}

module.exports = messageParserFactory;