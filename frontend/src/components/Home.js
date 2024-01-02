import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Homecarousal from './homecarousel/Homecarousal';
import LiveClasses from './homecarousel/liveClasses';
import WhyUsPage from './homecarousel/whyUs';

const Home = () => {

  return (
    <div>
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7">
          <h2 className='fw-bold fs-5'>"Unlocking the future of learning, one byte at a time.<br /> Embrace the digital revolution with Us..."</h2>
          <h1 style={{ paddingTop: '2rem', margin: 'auto 0', fontWeight: 'normal' }}>
            Make your Life <br/>{' '}
            <span style={{ color: 'red', fontWeight: 'bold' }}>
            &lt;
              <Typewriter
                words={['Better', 'Simple', 'Knowledgeable', 'Precious!']}
                loop={5}
                cursor
                cursorStyle="!"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={2000}
              />
            &gt;
            </span>
          </h1>
          <button className='explore_more mt-4'>Explore Courses</button>
        </div>
        <div className="col-md-5 mb-4">
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
      </div>
    </div>
    <Homecarousal />
    <LiveClasses/>
    <WhyUsPage/>
    </div>
  );
};

export default Home;
