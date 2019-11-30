import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import {  Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
import GuessForm from './GuessForm.js'
// import StartForm from './StartForm.js'
// import LoserForm from './LoserForm.js'

const Game = props => {
  const [game, setGame] = useState(null)
  const [guess, setGuess] = useState('')
  const [emptyWord, setEmptyWord] = useState([])
  const [word, setWord] = useState([])
  const [wrongAnswer, setWrongAnswer] = useState([])
  const [alphabet, setAlphabet] = useState([])
  const [guessCount, setGuessCount] = useState(1)
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
  }

  const handleSubmit = event => {
    event.preventDefault()
    correctGuess(guess)
    setGuess('')
  }

  const newGame = function () {
    const emptyWord = []
    const wrongAnswer = []
    const word = game.content
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
      'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    setWord(word.split(''))
    setAlphabet(alphabet)
    const wordsplit = word.split('')
    console.log(wordsplit)
    for (let i = 0; i < wordsplit.length; i++) {
      if (wordsplit[i] === ' ') {
        emptyWord.push('-')
      } else {
        emptyWord.push(' _ ')
      }
    }
    for (let i = 0; i < alphabet.length; i++) {
      wrongAnswer.push(' _ ')
    }
    setEmptyWord(emptyWord)
    setWrongAnswer(wrongAnswer)
  }

  const correctGuess = function (letter) {
    if (word.includes(letter)) {
      props.alert({
        heading: 'Success',
        message: 'You guessed correct!',
        variant: 'success'
      })
      for (let i = 0; i < emptyWord.length; i++) {
        if (letter === word[i]) {
          emptyWord[i] = letter
          checkWin()
        }
      }
    } else {
      wrongGuess(letter)
    }
  }

  const wrongGuess = function (letter) {
    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        props.alert({
          heading: 'Wrong!',
          message: 'Guess Again!',
          variant: 'warning'
        })
        setGuessCount(c => c + 1)
        console.log(guessCount)
        if (guessCount > 5) {
          props.history.push('/loser')
        }
        wrongAnswer[i] = letter
      }
    }
  }

  const checkWin = function () {
    const answer = []
    for (let i = 0; i < emptyWord.length; i++) {
      if (emptyWord[i] === '-') {
        answer.push(' ')
      } else if (emptyWord[i] !== '-') {
        answer.push(emptyWord[i])
      }
    }
    if (JSON.stringify(answer) === JSON.stringify(word)) {
      props.history.push('/winner')
    }
  }

  return (
    <div>
      <GuessForm
        game={game}
        guess={guess}
        newGame={newGame}
        emptyWord={emptyWord}
        wrongAnswer={wrongAnswer}
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
