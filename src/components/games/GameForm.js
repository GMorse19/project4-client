import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GameForm = ({ game, handleSubmit, handleChange, cancelPath }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="content">Content</Form.Label>
          <Form.Control
            required
            placeholder="Content..."
            value={game.content}
            name="content"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            placeholder="Category..."
            value={game.category}
            name="category"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to="/games">
          <Button>Cancel</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default withRouter(GameForm)
