import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

const HIDDEN_SYMBOL = '❓'

//fonction card on aura plus qu'a appeler <Card $a,$b,$c,$d/> 
const Card = ({ card, feedback, index, onClick }) => ( 
//comme pas de calcul alors pas de return
//card represente le symbole, feedback si la carte est tourne ou pas, index represente la cle de la carte, 
//onclick est la methode pour retourne donc doit etre declare
  <div className={`card ${feedback}`} onClick={() => onClick(index)}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

Card.propTypes = {
  card: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'justMatched',
    'justMismatched',
    'visible',
  ]).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Card