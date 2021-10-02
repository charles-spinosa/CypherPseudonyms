class CypherBoard {
  
  // this constructor is not robust to improper usage. it assumes that the options provided will always make sense given the words provided
  constructor(words, activeTurn = null) {
    
    // we don't have an active turn, so we must be at the start of a game, generate initial state. for use initially by the server.
    if (activeTurn === null) {
      // we'll be using this later. returns int between 0 <= int < max
      const getRandomWithinMax = max => Math.floor(Math.random() * max);

      // translate our word strings into word objects with role + revealed state;
      this.words = words.map(elem => ({word: elem, role: 'neutral', revealed: false}));
      this.blueTeamCount = 8;
      this.redTeamCount = 8;
      

      // we need to decide which team will be "it" and assign them an extra card
      const whoGoesFirst = () => getRandomWithinMax(2) === 0 ? 'red' : 'blue';
      this.activeTurn = whoGoesFirst();
      if (this.activeTurn === 'blue') this.blueTeamCount += 1;
      else this.redTeamCount += 1;

      // move through the words, assigning them a role (overwriting the default of 'neutral');
      // note that elements of this.words are updated sequentially by "destructively" splicing unassignedIndices.
      // could use some DRYing out?
      const assignRole = (availIndices, role, count) => {
        for (let i = 1; i <= count; i++) {
          let num = getRandomWithinMax(availIndices.length);
          const availIndex = availIndices.splice(num, 1)[0];
          this.words[availIndex].role = role;
        }
      }
      
      const unassignedIndices = words.map((elem, idx) => idx);
      assignRole(unassignedIndices, 'black', 1);
      assignRole(unassignedIndices, 'blue', this.blueTeamCount);
      assignRole(unassignedIndices, 'red', this.redTeamCount);

    } else {
      // our words array is filled with objects, meaning roles have been assigned/etc.
      this.words = words;

      // active turn is the only thing that can't be derrived from a list of words objects with word + role + revealed state
      this.activeTurn = activeTurn;
      this.blueTeamCount = 0;
      this.blueTeamCount = 0;

      for (let word of words) {
        if (word.team === 'red') this.redTeamCount++;
        if (word.team === 'blue') this.blueTeamCount++;
      }
    }
  }

  revealCard(idx, cb) {
    this.words[idx].revealed = true;

    if (cb) cb(this.words, this.activeTurn);
    return this.words;
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