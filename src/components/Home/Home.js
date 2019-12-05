import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
// import './Home.scss'
const Home = () => {
  return (
    <Carousel className='mt-5'>
      <Carousel.Item>
        <Carousel.Caption className="image1">
          <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>Welcome To CONST GAMER!</h1>
          </div>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src="game7.jpg"
          alt="First slide"
          height={ 500 }
          width= { 500 }
        />
        <Carousel.Caption className="image1">
          <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>Welcome To CONST GAMER!</h1>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="game6.jpg"
          alt="Second slide"
          height={ 500 }
          width= { 500 }
        />
        <Carousel.Caption>
          <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>Sign Up and enjoy the fun!</h1>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="game7.jpg"
          alt="Third slide"
          height={ 500 }
          width= { 500 }
        />
        <Carousel.Caption>
          <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>It is only a click away!</h1>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="game6.jpg"
          alt="Fourth slide"
          height={ 500 }
          width= { 500 }
        />
        <Carousel.Caption>
          <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>Look at all these great games!</h1>
          </div>
        </Carousel.Caption>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="game1.jpeg"
            alt="Fifth slide"
            height={ 500 }
            width= { 500 }
          />
          <Carousel.Caption>
            <div className="welcome-div" style={{ background: '#0b7515' }}><h1 style={{ color: 'black' }}>That I did not make!</h1>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel.Item>
    </Carousel>
  )
}
export default Home
