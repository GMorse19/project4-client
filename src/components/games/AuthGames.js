import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const AuthGames = props => {
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
    // <ListGroup.Item key={game.id} as={'a'} href={`#/auth-games/${game.id}`}>
    <Button className="box list" key={game.id} as={'a'} href={`#/auth-games/${game.id}`}><p>Category: {game.category} <br/> Game ID: {game.id} <br/> by - {game.user.email}</p></Button>
    // </ListGroup.Item>
  ))

  return (
    <div>
      <h1>Choose a Game to Play!</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col>{gamesJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default AuthGames
