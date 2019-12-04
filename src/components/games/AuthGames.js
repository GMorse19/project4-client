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

  const person = <Image
    src="person.png"
    height={ 125 }
    width={ 125 }
  />

  const place = <Image
    src="place.png"
    height={ 125 }
    width={ 125 }
    roundedCircle
  />

  const phrase = <Image
    src="phrase.jpeg"
    height={ 125 }
    width={ 125 }
  />

  const thing = <Image
    src="thing.jpeg"
    height={ 125 }
    width={ 125 }
  />

  const selectRandom = function () {
    const randomChoice = games[Math.floor(Math.random() * games.length)]
    console.log(randomChoice)
    props.history.push(`auth-games/${randomChoice.id}`)
  }

  const gamesJsx = games.map(game => (
    <ListGroup key={game.id}>
      <Row className="justify-content-center">
        <Col>
          <Button className="justify-content-center box list" as={'a'} href={`#/auth-games/${game.id}`}>
            <div>
              {(game.category === 'person') && person}
              {(game.category === 'place') && place}
              {(game.category === 'phrase') && phrase}
              {(game.category === 'thing') && thing}
            </div>
            <br /> Category: {game.category} <br/> Game ID: {game.id} <br/> by - {game.user.username}
          </Button>
        </Col>
      </Row>
    </ListGroup>
  ))

  return (
    <div>
      <h1>Choose a Game to Play!</h1>
      <Button onClick={selectRandom}>Random</Button>
      <Container>
        <Row className="justify-content-md-center">
          <Col>{gamesJsx}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(AuthGames)
