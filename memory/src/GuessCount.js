import React from 'react'
import PropTypes from 'prop-types'
import './GuessCount.css'

//fonction GuessCount qui prend un argument guesses et qui l'affiche dans une div
const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
}
export default GuessCount