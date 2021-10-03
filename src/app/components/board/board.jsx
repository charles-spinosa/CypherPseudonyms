import Card from '../card/card';

import './board.css'

// should the board be able to accept dimensions as props, then determine styling/layout based on that?

const Board = ({words: list, className, revealCard, revealHidden}) => {
  console.log({list});
  return (
    <ul className={`board ${className}`}>
      {list.map((item, idx) =>
        <Card 
          word={item.word} 
          key={item.word} 
          revealed={item.revealed} 
          revealCard={revealCard} 
          idx={idx} 
          cardRole={item.role} 
          revealHidden={revealHidden}
        />)
      }
    </ul>
  )
}

export default Board;