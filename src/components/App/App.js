import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
// import FooterPage from '../Footer/FooterPage'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import GameCreate from '../games/GameCreate.js'
import Games from '../games/Games.js'
import Game from '../games/Game.js'
import LoserForm from '../games/LoserForm.js'
import WinnerForm from '../games/WinnerForm.js'
import GuessForm from '../games/GuessForm.js'
import Home from '../Home/Home.js'
import AuthGames from '../games/AuthGames.js'
import AuthGame from '../games/AuthGame.js'
import GameEdit from '../games/GameEdit.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/games' render={() => (
            <Games alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/games/:id' render={() => (
            <Game alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/create-game' render={() => (
            <GameCreate alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/auth-games/:id/loser' render={() => (
            <LoserForm alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/auth-games/:id/winner' render={() => (
            <WinnerForm alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/guess-form' render={() => (
            <GuessForm alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/home' render={() => (
            <Home alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/auth-games' render={() => (
            <AuthGames alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/auth-games/:id' render={() => (
            <AuthGame alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/games/:id/edit' render={() => (
            <GameEdit alert={this.alert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
