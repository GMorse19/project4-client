import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import GameForm from './GameForm'

const GameEdit = (props) => {
  const [game, setGame] = useState({ content: '', category: '' })
  const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setGame(game => ({ ...game, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { game }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a game', variant: 'success' })
        setUpdated(true)
        props.history.push('/games')
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (updated) {
    return <Redirect to={`/games/${props.match.params.id}`} />
  }

  return (
    <GameForm
      game={game}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#home/${props.match.params.id}`}
    />
  )
}

export default withRouter(GameEdit)
