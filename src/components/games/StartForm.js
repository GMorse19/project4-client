import React from 'react'
import { Link } from 'react-router-dom'

const StartForm = ({ game, guess, wrong, wrongAnswer, newGame, emptyWord, handleSubmit, correctGuess, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>Press BEGIN and solve this puzzle created by {game.user.email}</h1>
    <Link to="/guess-form">Begin</Link>
  </form>
)

export default StartForm
