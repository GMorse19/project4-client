import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Image from 'react-image-resizer'
// import BackGround from 'BackGround.jpg'
// import {  Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
// import BackGround from './dice.jpg'

// import selectRandom from './AuthGames.js'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
// import GuessForm from './GuessForm.js'
// import StartForm from './StartForm.js'
// import LoserForm from './LoserForm.js'

const AuthGame = props => {
  const [game, setGame] = useState(null)
  // set state of guess to be entered
  const [guess, setGuess] = useState('')
  // set state for guesses to be displayed
  const [emptyWord, setEmptyWord] = useState([])
  // set state of the word to be guessed
  const [word, setWord] = useState([])
  const [solve, setSolve] = useState([])
  const [wrongAnswer, setWrongAnswer] = useState([])
  // set state of the alphabet - used for displaying wrong answers
  const [alphabet, setAlphabet] = useState([])
  // counter for wrong guesses
  const [guessCount, setGuessCount] = useState(0)
  // for hiding and showing input forms
  const [showForm, setShowForm] = useState(false)
  // for hiding and showing buttons
  const [changeButton, setChangeButton] = useState(true)
  // const [startOver, setStartOver] = useState(false)
  // set the state of {redX} for display
  const [redX, setRedX] = useState([])
  // set the state of {check} for display
  const [check, setCheck] = useState([])
  // set state of loser modal
  const [show, setShow] = useState(false)
  // set state of winner modal
  const [showWin, setShowWin] = useState(false)
  // GET game/:id
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

  if (!game) {
    return <p>Loading...</p>
  }

  const handleChange = event => {
    event.persist()
    setGuess(event.target.value)
  }
  // change for solve form
  const handleChange2 = event => {
    event.persist()
    setSolve(event.target.value)
  }
  // handle guess form
  const handleSubmit = event => {
    event.preventDefault()
    correctGuess(guess.toLowerCase())
    setGuess('')
  }
  // handle input for solve form
  const handleSubmit2 = event => {
    event.preventDefault()
    checkSolve(solve)
    setSolve('')
  }
  const checkImage = <img key={check} src={'check.jpeg'} />
  // image to be used for wrong answers
  const redXImage = <Image
  // set key to guessCount because the key needs to change in order
  // to be unique.
    key={guessCount}
    src="X.png"
    height={ 150 }
    width={ 150 }
  />
  // create new board/ clear board
  const newGame = function () {
    // reset fields
    setCheck([])
    setRedX([])
    setGuessCount(0)
    setShowForm(true)
    // setStartOver(false)
    const emptyWord = []
    const wrongAnswer = []
    const word = game.content
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
      'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    // set all letters to lower case for comparison
    setWord(word.toLowerCase().split(''))
    setAlphabet(alphabet)
    // split word into an array
    const wordsplit = word.split('')
    for (let i = 0; i < wordsplit.length; i++) {
      // check word for spaces
      if (wordsplit[i] === ' ') {
        // pushing '-' into blank spaces
        emptyWord.push('-')
      } else {
        // pushing '_' as a space holder for letters to be guessed
        emptyWord.push(' _ ')
      }
    }
    // setting wrong answer field
    for (let i = 0; i < alphabet.length; i++) {
      wrongAnswer.push(' _ ')
    }
    // setting the fields
    setEmptyWord(emptyWord)
    setWrongAnswer(wrongAnswer)
  }
  // checking guess
  const correctGuess = function (guess) {
    // const checkImage = <img key={check} src={'check.jpeg'} />
    // guess.toLowerCase()
    if (word.includes(guess)) {
      setCheck(checkImage)
      props.alert({
        heading: 'Success',
        message: 'You guessed correct!',
        variant: 'success'
      })
      // checking guess against word
      for (let i = 0; i < emptyWord.length; i++) {
        if (guess === word[i]) {
          emptyWord[i] = guess
          checkWin()
        }
      }
    } else {
      // if guess does not match any letter in word check for wrong guess
      wrongGuess(guess)
    }
  }
  // check if solved form filled out correctly
  const checkSolve = function (answer) {
    // compare answer to word/ game.content
    if ((answer.toLowerCase()) === (game.content.toLowerCase())) {
      // if correct, hide form
      setShowForm(!showForm)
      setEmptyWord(answer)
      // Show Win Modal
      handleShowWin()
      setCheck(checkImage)
    } else {
      // if not correct add to wrong guess count
      setGuessCount(c => c + 1)
      // clear green check
      setCheck([])
      // add red X
      setRedX(redX.concat(redXImage))
      // check if game is over
      if (guessCount > 3) {
        // if too many wrong guesses, hide form
        setShowForm(!showForm)
        // Show Loser Modal
        handleShow()
      }
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
        setCheck([])
        setRedX(redX.concat(redXImage))
        if (guessCount > 3) {
          setShowForm(!showForm)
          handleShow()
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
      setShowForm(!showForm)
      handleShowWin()
    }
  }
  // Start the game
  const start = function () {
    setShowForm(!showForm)
    setChangeButton(false)
    newGame()
  }
  // restart game(refactor?)
  const tryAgain = function () {
    handleClose()
    newGame()
    setChangeButton(false)
  }
  // opening and closing modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseWin = () => setShowWin(false)
  const handleShowWin = () => setShowWin(true)

  // <div className="App" style={{ backgroundImage: `url(${BackGround})` }}>
  return (
    <div>
      <div className="game-board" key={emptyWord}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sorry, You lost. Please try again.</Modal.Title>
          </Modal.Header>
          <Modal.Body>{redXImage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={tryAgain}>
              Try Again
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showWin} onHide={handleCloseWin}>
          <Modal.Header closeButton>
            <Modal.Title>You Won! The answer is {game.content}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{check}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseWin}>
              Close
            </Button>
            <Button variant="primary" as={'a'} href={'#/auth-games'}>
              Try Another
            </Button>
          </Modal.Footer>
        </Modal>
        {showForm && <Container>
          <Row>
            <Col><div>{redX}</div></Col>
            <Col>
              <h3>This challenge was created by {game.user.username} </h3>
              <h4>The category is: {game.category}</h4>
              <h1>{emptyWord}</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <label htmlFor="guess">Make A Guess - </label>
                  <Form.Control
                    required
                    placeholder="Guess..."
                    value={guess}
                    name="guess"
                    onChange={handleChange}
                  />
                  <Button type="submit">Guess</Button>
                </Form.Group>
              </Form>
              <Form onSubmit={handleSubmit2}>
                <Form.Group>
                  <label htmlFor="solve">Solve the puzzle - </label>
                  <Form.Control
                    required
                    placeholder="Solve..."
                    value={solve}
                    name="solve"
                    onChange={handleChange2}
                  />
                  <Button type="submit">Solve</Button>
                </Form.Group>
              </Form>
              <h2 className="wrongGuess"><p><span>Wrong guesses: {guessCount}</span></p>{wrongAnswer}</h2></Col>
            <Col>
              <Button variant="primary" onClick={tryAgain}>Start Over</Button>
              <br />
              <br />
              <Link to="/">
                <Button variant="danger">Home</Button>
              </Link>
              <h2>{check}</h2></Col>
          </Row>
        </Container>}
        <br />
        {changeButton && <div><Button variant="primary" onClick={start}><h3>Press HERE to begin</h3></Button>
          <h3>This challenge was created by {game.user.username} </h3>
          <h4>The category is: {game.category}</h4></div>}
      </div>
    </div>
  )
}

export default withRouter(AuthGame)
