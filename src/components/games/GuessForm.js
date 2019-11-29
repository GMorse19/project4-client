import React from 'react'
import { Link } from 'react-router-dom'

const GuessForm = ({ guess, emptyWord, handleSubmit, correctGuess, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <h1>{emptyWord}</h1>
    <label htmlFor="guess">Make A Guess</label>
    <input
      placeholder="Guess..."
      value={''}
      name="guess"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default GuessForm
