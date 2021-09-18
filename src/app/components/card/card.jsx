import './card.css'

// issues: card controls its own width, rather than board managing the layout of things

const Card = ({word}) => {
  return (
    <li className='card'>
      <label>{word}</label>
    </li>
  )
}

export default Card;