import { useState, useEffect } from 'react';

const gameEngine = require('/Users/charlesspinosa/Documents/Personal Projects/CypherPseudonyms/gameEngine');

import Board from './components/board/board';
import GameLobby from './components/gameLobby/gameLobby';

import './App.css';
import ClueGiverControls from './components/roleControls/clueGiverControls';
import GuesserControls from './components/roleControls/guesserControls';

const DEMO_WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five'];
const DEMO_PLAYERS = [{name: 'john', team: 0}, {name: 'dan', team: 1}, {name: 'charlie', team: 0}, {name: 'katie', team: 1}, {name: 'marge', team: 0}, {name: 'rosa barks', team: 1}];

function App() {
  const connection = null;
  const game2 = null;
  useEffect(() => {
    connection = new WebSocket('ws://localhost:8080');
    connection.onopen(() => wsClient.send(JSON.stringify({operation: 'request-initial-board-state'})))
    
    const messageParser = message => {
      const response = JSON.parse(message.toString());
      if (response.operation === 'return-initial-board-state') {
        game2 = new gameEngine.CypherBoard(response.words, response.activeTurn)
        setWords(game2.words);
      }
      else if (response.operation === 'card-revealed') {
        if (game2) game2.revealCard(response.index);
        console.log('i received a card flip, I should update')
        setWords(game2.words);
      }
    
      if (game2) console.log(game.words)
    }
    
    wsClient.on('message', messageParser);

    return () => {
      connection.close();
    }
  }, [])
  const [words, setWords] = setState([]);
  const [activeTeam, setActiveTeam] = setState(null);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's play some Cypher Pseudonyms</h1>
      </header>
      <Board words={DEMO_WORDS} className='Game-board'/>
      <section className='role-based-controls'>
        <ClueGiverControls /> || <GuesserControls />
      </section>
      <GameLobby players={DEMO_PLAYERS} className='Game-lobby'/>
      <footer>Here's the footer</footer>
    </div>
  );
}

export default App;
