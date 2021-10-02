import { useState, useEffect, useRef } from 'react';

import Board from './components/board/board';
import GameLobby from './components/gameLobby/gameLobby';

import './App.css';
import ClueGiverControls from './components/roleControls/clueGiverControls';
import GuesserControls from './components/roleControls/guesserControls';

const gameEngine = require('../gameEngine');

const DEMO_PLAYERS = [{name: 'john', team: 0}, {name: 'dan', team: 1}, {name: 'charlie', team: 0}, {name: 'katie', team: 1}, {name: 'marge', team: 0}, {name: 'rosa barks', team: 1}];

function App() {
  const [words, setWords] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  let connection = useRef(null);

  let game2 = null;

  useEffect(() => {
    connection.current = new WebSocket('ws://localhost:8080');
    connection.current.onopen = () => connection.current.send(JSON.stringify({operation: 'request-initial-board-state'}));
    
    const messageParser = message => {
      const response = JSON.parse(message.data);
      if (response.operation === 'return-initial-board-state') {
        game2 = new gameEngine.CypherBoard(response.words, response.activeTurn)
        setWords(game2.words);
      }
      else if (response.operation === 'card-revealed') {
        if (game2) game2.revealCard(response.index);
        console.log('i received a card flip, I should update')
        setWords(game2.words);
      }
    
      if (game2) console.log(game2.words)
    }
    
    connection.current.onmessage = messageParser;

    return () => {
      connection.current.close();
    }
  }, []);

  const revealCard = (idx) => {
    const message = {
      operation: 'reveal-card',
      index: idx
    }
    console.log({this: this}, {game2});
    game2.revealCard(idx);
    connection.current.send(JSON.stringify(message));
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's play some Cypher Pseudonyms</h1>
      </header>
      <Board words={words} className='Game-board' revealCard={revealCard}/>
      <section className='role-based-controls'>
        {<ClueGiverControls /> || <GuesserControls />}
      </section>
      <GameLobby players={DEMO_PLAYERS} className='Game-lobby'/>
      <footer>Here's the footer</footer>
    </div>
  );
}

export default App;
