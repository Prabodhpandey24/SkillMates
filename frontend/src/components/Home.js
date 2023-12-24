import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Carousel } from 'react-bootstrap';
import Homecarousal from './homecarousel/Homecarousal';

const Home = () => {

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
            Life is simple{' '}
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              <Typewriter
                words={['Eat', 'Sleep', 'Code', 'Repeat!']}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
        </div>
        <div className="col-md-6 mb-4">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://cdn.sanity.io/images/tlr8oxjg/production/c82c304bfa399fe0cb6510d2a5d7fb95d04f06e1-1456x816.png?w=3840&q=100&fit=clip&auto=format"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://www.sweetwater.com/insync/media/2019/05/guitar-parts-hero-1050x550.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://faraitltd.com/wp-content/uploads/2023/02/Screenshot_7.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <Homecarousal />
      </div>
    </div>
  );
};

export default Home;
