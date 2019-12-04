import React from 'react'
// import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-image-resizer'

// const authenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#home">Welcome</Nav.Link>
//     <Nav.Link href="#change-password">Change Password</Nav.Link>
//     <Nav.Link href="#create-game">Create A Game</Nav.Link>
//     <Nav.Link href="#games">List of Games</Nav.Link>
//     <Nav.Link href="#auth-games">Choose A Game</Nav.Link>
//     <Nav.Link href="#sign-out">Sign Out</Nav.Link>
//   </Fragment>
// )
//
// const unauthenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#sign-up">Sign Up</Nav.Link>
//     <Nav.Link href="#sign-in">Sign In</Nav.Link>
//   </Fragment>
// )
//
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#home">Home</Nav.Link>
//   </Fragment>
// )

const FooterPage = ({ user }) => (
  <Navbar fixed="bottom" bg="primary" variant="dark" expand="md">
    <div className="container text-center">
      <span className="navbar-text mr-2">&#169; Copyright 2019 Geoffrey Morse</span>
    </div>
    <div className="container">
      <a className="footerLink" href={'https://gmorse19.github.io'}>Portfolio</a>
      <a href={'https://github.com/GMorse19'}><Image src="GitHub.png" width= { 30 } height={ 30 }/></a>
    </div>
  </Navbar>
)

export default FooterPage
