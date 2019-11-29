import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Games = props => {
  const [games, setGames] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/games`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(response => {
        setGames(response.data.games)
      })
      .then(() => props.alert({ heading: 'Success', message: 'You got Games', variant: 'success' }))
      .catch(console.error)
  }, [])

  const gamesJsx = games.map(game => (
    <ListGroup.Item key={game.id} as={'a'} href={`#/games/${game.id}`}>
      {game.category} by - {game.user.email}
    </ListGroup.Item>
  ))

  return (
    <div>
      <h1>Games!</h1>
      <Link to="/create-game">Add A Game</Link>
      <ListGroup>
        {gamesJsx}
      </ListGroup>
    </div>
  )
}

export default Games
