import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../homecarousel/Homecarousal.css"
const Homecarousal = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/v1/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className='container'>
      <div className='d-flex'>
        <h2 className="font-weight-bold fx-5" style={{ borderBottom: '2px solid #000', cursor: 'pointer', transition: 'color 0.3s' }}>
          Popular Courses
        </h2>
      </div>
      <Carousel responsive={responsive}>
        {courses.map((course) => (
          <div className="card course-card m-3" key={course.id} style={{ cursor: 'pointer', transition: 'transform 0.3s' }}>
            <img className="card-img-top" src={course.imageUrl} alt={course.name} />
            <div className="card-body mt-2 text-start">
              <h6 className="card-title">Name: {course.name}</h6>
              <p className="card-title">Discount: {course.discount}%</p>
              <p className="card-title">Price: {course.price}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>

  )
}

export default Homecarousal;
