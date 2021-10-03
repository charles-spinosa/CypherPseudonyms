import './card.css'

// issues: card controls its own width, rather than board managing the layout of things

const Card = ({word, revealed = false, revealCard, idx, cardRole, revealHidden}) => {
  console.log({word})
  const shouldShowColor = revealed || revealHidden;
  // const shouldShowColor = revealed;
  return (
    <li className={'card' + (revealed ? ' revealed' : '')} style={shouldShowColor ? {backgroundColor: cardRole} : {}} onClick={() => revealCard(idx)}>
      <label style={{opacity: 1}}>{word.word ? word.word : word}</label>
    </li>
  )
}

export default Card;