import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
    // <ListGroup.Item key={game.id} as={'a'} href={`#/games/${game.id}`}>
    <Button className="box list" key={game.id} as={'a'} href={`#/games/${game.id}`}><p>Game ID : {game.id}<br/>Category: {game.category} <br/>by - {game.user.email}</p></Button>
    // </ListGroup.Item>
  ))

  return (
    <div>
      <h1>Games!</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col>{gamesJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Games
