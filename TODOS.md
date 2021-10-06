todos:

- ~~figure out why the datatype of word is changing from string to object when board is reset~~
  - this was because the server was NOT passing the active turn in response to a 'board-reset'. no active turn meant the front-end game-engine was assigning role/revealed status to each existing "word" (which already was an object containing that)
- get ws message generation/management streamlined,
- get user registration handled
- resetting the board while a user is "the clue giver" shows a mix of old board's team colors + new board's team colors. this is solved client side by toggling off and on the game master view. probably means stale CSS classes?
- make ws connection IP dynamic,
