import './card.css'

// issues: card controls its own width, rather than board managing the layout of things

const Card = ({word, revealed = false, revealCard, idx}) => {
  return (
    <li className={'card' + (revealed ? ' revealed' : '')} onClick={() => revealCard(idx)}>
      <label>{word}</label>
    </li>
  )
}

export default Card;