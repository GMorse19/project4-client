import React from 'react'
import { Link } from 'react-router-dom'

const GuessForm = ({ guess, newGame, emptyWord, handleSubmit, correctGuess, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>{emptyWord}</h1>
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
