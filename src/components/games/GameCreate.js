import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import GameCreateForm from './GameCreateForm.js'

const GameCreate = props => {
  const [game, setGame] = useState({ content: '', category: '' })

  const handleChange = event => {
    event.persist()
    setGame({ ...game, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/games`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { game }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You created a game', variant: 'success' })
        props.history.push(`games/${response.data.game.id}`)
      })
      .catch(console.error)
  }

  const noNums = function (event) {
    const re = /[A-Za-z_?_ ]+/g
    if (!re.test(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <div className="game-board">
      <GameCreateForm
        game={game}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        noNums={noNums}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(GameCreate)
