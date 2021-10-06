const { DEMO_WORDS } = require('./DEMO_WORDS.json');

class CypherBoard {
  static MINIMUM_CARD_COUNT = 8;
  
  static getRandomWithinMax = max => Math.floor(Math.random() * max);
  
  // takes in an array of word strings and saturates them with role: neutral and revealed: false
  static populateWordsWithNeutralRoles = words => words.map(elem => ({word: elem, role: 'neutral', revealed: false}));
  
  static pickARandomTeam = () => CypherBoard.getRandomWithinMax(2) === 0 ? 'red' : 'blue';

  // move through the words, assigning them a role (overwriting the default of 'neutral');
  // note that elements of this.words are updated sequentially by "destructively" splicing unassignedIndices.
  static assignRole = (wordBank, availIndices, role, count) => {
    for (let i = 1; i <= count; i++) {
      let num = CypherBoard.getRandomWithinMax(availIndices.length);
      const availIndex = availIndices.splice(num, 1)[0];
      wordBank[availIndex].role = role;
    }
  }

  static createGame(gameInstance, words) {
    gameInstance.words = CypherBoard.populateWordsWithNeutralRoles(words);
    gameInstance.blueTeamCount = CypherBoard.MINIMUM_CARD_COUNT;
    gameInstance.redTeamCount = CypherBoard.MINIMUM_CARD_COUNT;
    
    gameInstance.activeTurn = CypherBoard.pickARandomTeam();
    if (gameInstance.activeTurn === 'blue') gameInstance.blueTeamCount += 1;
    else gameInstance.redTeamCount += 1;
    
    const unassignedIndices = gameInstance.words.map((elem, idx) => idx);
    CypherBoard.assignRole(gameInstance.words, unassignedIndices, 'black', 1);
    CypherBoard.assignRole(gameInstance.words, unassignedIndices, 'blue', gameInstance.blueTeamCount);
    CypherBoard.assignRole(gameInstance.words, unassignedIndices, 'red', gameInstance.redTeamCount);  
  }

  static loadOngoingGame(gameInstance, words, activeTurn) {
    // our words array is filled with objects, meaning roles have been assigned/etc.
    gameInstance.words = words;

    // active turn is the only thing that can't be derrived from a list of words objects with word + role + revealed state
    gameInstance.activeTurn = activeTurn;

    for (let word of words) {
      if (word.team === 'red') gameInstance.redTeamCount++;
      if (word.team === 'blue') gameInstance.blueTeamCount++;
    }
  }

  // this constructor is not robust to improper usage. it assumes that the options provided will always make sense given the words provided
  constructor(words = DEMO_WORDS, activeTurn = null) {
    this.words = [];
    this.blueTeamCount = 0;
    this.redTeamCount = 0;

    // we don't have an active turn, so we must be at the start of a game, generate initial state. for use initially by the server.
    if (activeTurn === null) {
      CypherBoard.createGame(this, words); 
    } else {
      CypherBoard.loadOngoingGame(this, words, activeTurn)
    }
  }

  revealCard(idx, cb) {
    this.words[idx].revealed = true;

    if (cb) cb(this.words, this.activeTurn);
    return this.words;
  }

  resetBoardWithNewWords(words = DEMO_WORDS) {
    CypherBoard.createGame(this, words); 
  }

  changeTurn() {
    this.activeTurn = this.activeTurn === 'blue' ? 'red' : 'blue';
  }

  get remainingBlue() {
    return this.words.filter(elem => elem.role === 'blue').length;
  }

  get remainingRed() {
    return this.words.filter(elem => elem.role === 'red').length;
  }
}

module.exports = {CypherBoard};