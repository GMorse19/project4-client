import React from 'react'
// import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

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
  <Navbar collapseOnSelect fixed="bottom" bg="primary" variant="dark" expand="md">
    <p>copyright 2019</p>
  </Navbar>
)

export default FooterPage
