import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-image-resizer'

const FooterPage = ({ user }) => (
  <Navbar fixed="bottom" bg="primary" variant="dark" expand="md">
    <div className="container text-center">
      <span className="navbar-text mr-2">&#169; Copyright 2019 Geoffrey Morse</span>
    </div>
    <div className="container">
      <a className="footerLink" style={{ color: 'black' }} href={'https://gmorse19.github.io'}>Portfolio</a>
      <a href={'https://github.com/GMorse19'}><Image src="GitHub.png" width= { 30 } height={ 30 }/></a>
    </div>
  </Navbar>
)

export default FooterPage
