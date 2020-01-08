import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
// import './Home.scss'
const Home = () => {
  return (
    <div style={{ }}>
      <Carousel className=''>
        <Carousel.Item>
          <img
            className="d-block"
            src="game7.jpg"
            alt="First slide"
            style= {{ margin: '0 auto', width: '60vw', height: '40vw' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="game6.jpg"
            alt="Second slide"
            style= {{ margin: '0 auto', width: '60vw', height: '40vw' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="ConstGamer.png"
            alt="Third slide"
            style= {{ margin: '0 auto', width: '60vw', height: '40vw' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="TicTac.png"
            alt="Fourth slide"
            style= {{ margin: '0 auto', width: '60vw', height: '40vw' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="QuipShot.png"
            alt="Fifth slide"
            style= {{ margin: '0 auto', width: '60vw', height: '40vw' }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
export default Home
