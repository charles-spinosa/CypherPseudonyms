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
  const [isLeader, setIsLeader] = useState(false);
  let connection = useRef(null);

  let game2 = useRef(null);

  useEffect(() => {
    connection.current = new WebSocket('ws://192.168.1.136:8080');
    connection.current.onopen = () => connection.current.send(JSON.stringify({operation: 'request-initial-board-state'}));
    
    const messageParser = message => {
      const response = JSON.parse(message.data);
      if (response.operation === 'return-initial-board-state') {
        game2.current = new gameEngine.CypherBoard(response.words, response.activeTurn)
        console.log(game2.current.words);
        setWords(game2.current.words);
      }
      else if (response.operation === 'card-revealed') {
        if (game2.current) game2.current.revealCard(response.index);
        setWords(game2.current.words.slice());
      }
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
    game2.current.revealCard(idx);
    connection.current.send(JSON.stringify(message));
  }

  const resetGame = () => {
    setWords([]);
    const message = {
      operation: 'reset-board'
    }
    connection.current.send(JSON.stringify(message));
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's play some Cypher Pseudonyms</h1>
      </header>
      <Board words={words} className='Game-board' revealCard={revealCard} revealHidden={isLeader}/>
      <section className='role-based-controls'>
        <input type='checkbox' value={isLeader} onClick={() => setIsLeader(!isLeader)}/>
        <button onClick={resetGame}>Reset Game</button>
        {<ClueGiverControls /> || <GuesserControls />}
      </section>
      <GameLobby players={DEMO_PLAYERS} className='Game-lobby'/>
      <footer>Here's the footer</footer>
    </div>
  );
}

export default App;
