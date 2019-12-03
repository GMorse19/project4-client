import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import {  Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
// import GuessForm from './GuessForm.js'
// import StartForm from './StartForm.js'
// import LoserForm from './LoserForm.js'

const AuthGame = props => {
  const [game, setGame] = useState(null)
  const [guess, setGuess] = useState('')
  const [emptyWord, setEmptyWord] = useState([])
  const [word, setWord] = useState([])
  const [wrongAnswer, setWrongAnswer] = useState([])
  const [alphabet, setAlphabet] = useState([])
  const [guessCount, setGuessCount] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [changeButton, setChangeButton] = useState(true)
  const [redX, setRedX] = useState([])
  const [check, setCheck] = useState([])
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
    setCheck([])
    setRedX([])
    setGuessCount(0)
    const emptyWord = []
    const wrongAnswer = []
    const word = game.content
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
      'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    setWord(word.toLowerCase().split(''))
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
    const checkImage = <img key={check} src={'check.jpeg'} />
    if (word.includes(letter)) {
      setCheck(checkImage)
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
  // let redX = ['why']
  const wrongGuess = function (letter) {
    const redXImage = <img key={redX} src={'X.png'} />
    // setRedX(redX.concat(redXImage))

    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        props.alert({
          heading: 'Wrong!',
          message: 'Guess Again!',
          variant: 'warning'
        })
        setGuessCount(c => c + 1)
        setCheck([])
        setRedX(redX.concat(redXImage))
        console.log(guessCount)
        if (guessCount > 3) {
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

  const start = function () {
    setShowForm(!showForm)
    setChangeButton(!changeButton)
    newGame()
  }

  const tryAgain = function () {
    newGame()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{emptyWord}</h1>
      {showForm && <div>
        <label htmlFor="guess">Make A Guess - </label>
        <input
          placeholder="Guess..."
          value={guess}
          name="guess"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <Button variant="primary" size="lg" block onClick={tryAgain}>TRY AGAIN</Button>
        <br/>
        <Link to="/">
          <button>Cancel</button>
        </Link>
        <h2 className="wrongGuess">{wrongAnswer}</h2>
        <h2>{guessCount} {check}</h2>
        <div>{redX}</div>
        <br />
      </div>}
      {changeButton && <Button variant="primary" size="lg" block onClick={start}>PRESS HERE TO PLAY</Button>}
    </form>
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
export default withRouter(AuthGame)
