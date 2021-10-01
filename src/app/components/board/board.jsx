import Card from '../card/card';

import './board.css'

// should the board be able to accept dimensions as props, then determine styling/layout based on that?

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