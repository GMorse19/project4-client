import React from 'react'
import { Link } from 'react-router-dom'

const GameForm = ({ game, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="content">Content</label>
    <input
      placeholder="Content..."
      value={game.content}
      name="content"
      onChange={handleChange}
    />

    <label>Category</label>
    <input
      placeholder="Category..."
      value={game.category}
      name="category"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default GameForm
