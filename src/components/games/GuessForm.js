import React from 'react'
import { Link } from 'react-router-dom'

const GuessForm = ({ guess, wrong, wrongAnswer, newGame, emptyWord, handleSubmit, correctGuess, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>{emptyWord}</h1>
    <h2>{wrong}</h2>
    <h2>{wrongAnswer}</h2>
    <label htmlFor="guess">Make A Guess</label>
    <input
      placeholder="Guess..."
      value={guess}
      name="guess"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <button onClick={newGame}>Play</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default GuessForm
