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
  const [emptyWord, setEmptyWord] = useState([])
  const [word, setWord] = useState([])
  const [wrong, setWrong] = useState([])
  const [wrongAnswer, setWrongAnswer] = useState([])
  const [alphabet, setAlphabet] = useState([])
  // const [wrongGuess, setWrongGuess] = useState(false)
  // const [guessWord, setGuessWord] = useState([])
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
    // setGuess({ ...guess, [event.target.name]: event.target.value })
    setGuess(event.target.value)
    // console.log(guess)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // correctGuess(guess)
    // setGuess(event.target.value)
    props.alert({ heading: 'Success', message: 'You guessed correct!', variant: 'success' })
    // props.history.push(`games/${response.data.game.id}`)
  }

  const newGame = function () {
    const emptyWord = []
    const wrongAnswer = []
    const word = game.content
    const alphabet = ['a', 'b', 'c']
    setWord(word.split(''))
    setAlphabet(alphabet)
    for (let i = 0; i < word.length; i++) {
      emptyWord.push('X')
    }
    for (let i = 0; i < alphabet.length; i++) {
      wrongAnswer.push('X')
    }
    setEmptyWord(emptyWord)
    setWrong('5 guesses: ')
    setWrongAnswer(wrongAnswer)
    // setWrongGuess(false)
  }

  // const wrongAnswer = []
  // const wrong = []
  // let wrongGuess = false
  const correctGuess = function (letter) {
    // let wrongGuess = false
    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        if (letter === word[i]) {
          emptyWord[i] = letter
        }
      }
      // else if (word.includes(letter) === false) {
      //   wrongGuess = true
      // setWrongGuess(true)
    } else {
      wrongGuess(letter)
    }
  }
  // if (wrongGuess === true) {
  //   setWrongAnswer(wrongAnswer.concat('letter'))
  //   console.log(wrongAnswer)
  // }
  // wrongGuess = false
  // setWrong(wrongGuess)
  // return wrongGuess
  // }

  const wrongGuess = function (letter) {
    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        wrongAnswer[i] = letter
      }
    // if (word.includes(letter) === false) {
    //   wrongAnswer[i] = letter
    }
  }

  correctGuess(guess)
  // wrongGuess(guess)
  console.log(wrongAnswer)
  // console.log(guess)
  // setGuessWord(emptyWord)

  return (
    <div>
      <GuessForm
        guess={guess}
        newGame={newGame}
        emptyWord={emptyWord}
        wrong={wrong}
        wrongAnswer={wrongAnswer}
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
