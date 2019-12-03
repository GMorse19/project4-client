import React from 'react'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const WinnerForm = ({ game, word, emptyWord, cancelPath }) => (
  <div>
    <h1>You Win!</h1>
    <h3>The correct answer is: {word}</h3>
  </div>
)

export default withRouter(WinnerForm)
