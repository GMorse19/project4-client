import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
// import GameForm from './GameForm.js'
import GameCreateForm from './GameCreateForm.js'
// import Layout from '../shared/Layout'

const GameCreate = props => {
  const [game, setGame] = useState({ content: '', category: '' })
  // const [createdGameId, setCreatedGameId] = useState(null)

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

  // if (createdGameId) {
  //   return <Redirect to={`/games/${createdGameId}`} />
  // }

  return (
    <div>
      <GameCreateForm
        game={game}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </div>
  )
}

export default withRouter(GameCreate)
