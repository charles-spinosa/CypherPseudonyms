import Card from '../card/card';

import './board.css'

// is board really a board right now? or just a flexbox that happens to have 25 items that self assign 19%?
// TODO: a board should probably take props for row x column, then auto-space things to make that work? Then again,
// flexbox that wraps around allows for variable length allows for non-rectangular item-list sizes

const Board = ({words: list, className}) => {
  return (
    <ul className={`board ${className}`}>
      {list.map(item =>
        <Card word={item} key={item}/>)
      }
    </ul>
  )
}

export default Board;