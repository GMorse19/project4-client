import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GameForm = ({ game, noNums, handleSubmit, handleChange, cancelPath }) => (
  <div className="game-board row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h1>Create a new word or phrase.</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="content"></Form.Label>
          <Form.Control
            required
            type="text"
            onKeyPress={(e) => noNums(e)}
            placeholder="Enter Content Here..."
            value={game.content}
            name="content"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category">Choose A Category</Form.Label>
          <Form.Check
            type="radio"
            label="Phrase"
            value="phrase"
            checked={game.category === 'phrase'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Person"
            value="person"
            checked={game.category === 'person'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Place"
            value="place"
            checked={game.category === 'place'}
            name="category"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Thing"
            value="thing"
            checked={game.category === 'thing'}
            name="category"
            onChange={handleChange}
          />
          <br/>
          <Form.Label>Or create your own category here.</Form.Label>
          <Form.Control
            placeholder="Create Category Here..."
            value={game.category}
            name="category"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  </div>
)

export default withRouter(GameForm)
