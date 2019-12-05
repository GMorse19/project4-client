import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Game = props => {
  const [game, setGame] = useState(null)
  const userId = props.user ? props.user_id : null

  useEffect(() => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setGame(res.data.game))
      .catch(console.error)
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'You deleted a game', variant: 'success' })
        props.history.push('/games')
      })
      .catch(() => {
        props.alert({ heading: 'Uh Oh!', message: 'You did not delete a game', variant: 'warning' })
      })
  }

  if (!game) {
    return <p>Loading...</p>
  }

  return (
    <div className="game-board">
      <h2>Content: {game.content}</h2>
      <h2>Category: {game.category}</h2>
      <h2>ID: {game.id}</h2>
      <h2>User: {game.user.email}</h2>
      <div>
        <Button href={`#games/${props.match.params.id}/edit`} variant="primary" className="mr-2">Update</Button>
        {userId === game.user_id && <Button onClick={handleDelete} className="btn btn-danger">delete</Button>}
      </div>
    </div>
  )
}

export default withRouter(Game)
