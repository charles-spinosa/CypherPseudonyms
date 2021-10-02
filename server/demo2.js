const ws = require('ws');

const gameEngine = require('../gameEngine');

var wsClient = new ws('ws://localhost:8080');
wsClient.on('open', () => wsClient.send(JSON.stringify({operation: 'request-initial-board-state'})))

let game;

const messageParser = message => {
  console.log('client received message')
  const response = JSON.parse(message.toString());
  console.log(response)
  if (response.operation === 'return-initial-board-state') {
    game = new gameEngine.CypherBoard(response.words, response.activeTurn)
  }
  else if (response.operation === 'reveal-card') {
    if (game) game.revealCard(response.index);
  }

  if (game) console.log(game.words)
}

wsClient.on('message', messageParser);

setTimeout(() => {
  wsClient.send(JSON.stringify({operation: 'reveal-card', index: 10}))
}, 10000)