import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-image-resizer'
// import Text from 'react-bootstrap/Text'

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

  const redXImage = <Image
    src="X.png"
    height={ 125 }
    width={ 125 }
  />

  const places = <Image
    src="check.jpeg"
    height={ 125 }
    width={ 125 }
  />

  const gamesJsx = games.map(game => (
    <ListGroup key={game.id}>
      <Row className="justify-content-center">
        <Col>
          <Button className="justify-content-center box list" as={'a'} href={`#/auth-games/${game.id}`}>
            {(game.category === 'random') && redXImage}
            {(game.category === 'places') && places}
            <br /> Category: {game.category} <br/> Game ID: {game.id} <br/> by - {game.user.username}
          </Button>
        </Col>
      </Row>
    </ListGroup>
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

export default withRouter(AuthGames)
