import React from 'react'
import { Link } from 'react-router-dom'

const GuessForm = ({ guess, wrong, wrongAnswer, newGame, emptyWord, handleSubmit, correctGuess, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>{emptyWord}</h1>
    <h2>{wrong}</h2>
    <label htmlFor="guess">Make A Guess - </label>
    <input
      placeholder="Guess..."
      value={guess}
      name="guess"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
    <br />
    <button onClick={newGame}>Start Over</button>
    <br />
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
    <h2 className="wrongGuess">{wrongAnswer}</h2>
  </form>
)

export default GuessForm
