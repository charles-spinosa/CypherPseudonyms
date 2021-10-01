import Board from './components/board/board';
import GameLobby from './components/gameLobby/gameLobby';

import './App.css';
import ClueGiverControls from './components/roleControls/clueGiverControls';
import GuesserControls from './components/roleControls/guesserControls';

const DEMO_WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five'];
const DEMO_PLAYERS = [{name: 'john', team: 0}, {name: 'dan', team: 1}, {name: 'charlie', team: 0}, {name: 'katie', team: 1}, {name: 'marge', team: 0}, {name: 'rosa barks', team: 1}];


function App() {
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
