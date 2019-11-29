import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import {  Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
import GuessForm from './GuessForm.js'

const Game = props => {
  const [game, setGame] = useState(null)
  const [guess, setGuess] = useState('')
  // const userId = props.user_id
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

  // const handleDelete = event => {
  //   axios({
  //     url: `${apiUrl}/games/${props.match.params.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     }
  //   })
  //     .then(() => {
  //       props.alert({ heading: 'Success', message: 'You deleted a game', variant: 'success' })
  //       props.history.push('/games')
  //     })
  //     .catch(() => {
  //       props.alert({ heading: 'Uh Oh!', message: 'You did not delete a game', variant: 'warning' })
  //     })
  // }

  if (!game) {
    return <p>Loading...</p>
  }

  // if (deleted) {
  //   return <Redirect to={
  //     { pathname: '/', state: { msg: 'Game succesfully deleted!' } }
  //   } />
  // }

  const handleChange = event => {
    event.persist()
    setGuess(event.target.value)
    console.log(guess)
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.alert({ heading: 'Success', message: 'You guessed correct!', variant: 'success' })
    // props.history.push(`games/${response.data.game.id}`)
  }

  const emptyWord = []
  let word = game.content
  word = word.split('')
  for (let i = 0; i < word.length; i++) {
    emptyWord.push('X')
  }

  const correctGuess = function (letter) {
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        emptyWord[i] = letter
      }
    }
  }

  correctGuess(guess)
  console.log(guess)
  return (
    <div>
      <GuessForm
        guess={guess}
        emptyWord={emptyWord}
        correctGuess={correctGuess}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
  // return (
  //   <div className="board">
  //     <h2>{game.content}</h2>
  //     <h2>{word}</h2>
  //     <h3>{emptyWord}</h3>
  //     <form onSubmit={handleSubmit}>
  //       <input />
  //       <button type="submit">Submit</button>
  //     </form>
  //   </div>
  // )
  // return (
  //   <div>
  //     <h2>Content: {game.content}</h2>
  //     {userId === game.user_id && <button onClick={handleDelete} className="btn btn-danger">Delete</button>}
  //   </div>
  // )
}
// {game && game.content} cool alternative.
export default withRouter(Game)
