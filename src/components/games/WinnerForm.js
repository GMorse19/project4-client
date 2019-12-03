import React from 'react'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const WinnerForm = ({ game, word, emptyWord, cancelPath }) => (
  <div>
    <h1>You Win!</h1>
    <h3></h3>
  </div>
)

export default withRouter(WinnerForm)
