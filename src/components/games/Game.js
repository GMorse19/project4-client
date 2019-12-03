import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
// import GuessForm from './GuessForm.js'
// import StartForm from './StartForm.js'
// import LoserForm from './LoserForm.js'

const Game = props => {
  const [game, setGame] = useState(null)
  // const [guess, setGuess] = useState('')
  // const [emptyWord, setEmptyWord] = useState([])
  // const [word, setWord] = useState([])
  // const [wrongAnswer, setWrongAnswer] = useState([])
  // const [alphabet, setAlphabet] = useState([])
  // const [guessCount, setGuessCount] = useState(1)
  // const [showForm, setShowForm] = useState(false)
  const userId = props.user ? props.user_id : null
  // const [deleted, setDeleted] = useState(false)
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

  // if (deleted) {
  //   return <Redirect to={
  //     { pathname: '/', state: { msg: 'Game succesfully deleted!' } }
  //   } />
  // }

  // const handleChange = event => {
  //   event.persist()
  //   setGuess(event.target.value)
  // }
  //
  // const handleSubmit = event => {
  //   event.preventDefault()
  //   correctGuess(guess)
  //   setGuess('')
  // }

  return (
    <div>
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
// {game && game.content} cool alternative.
export default withRouter(Game)
