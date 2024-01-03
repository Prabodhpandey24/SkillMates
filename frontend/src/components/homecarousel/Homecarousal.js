import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarRatings from 'react-star-ratings';
import '../homecarousel/Homecarousal.css';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from '../Loader/LoadingOverlay';
import TopLoadingBar from 'react-top-loading-bar';

const Homecarousal = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCourseClick = (path) => {
    setLoading(true);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 10, 100));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      navigate(`/courses/${path}`);
    }, 2000);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container my-5">
      <TopLoadingBar progress={loadingProgress} color="#f11946" height={3} />
      <div className="py-5">
        <h2 className="sectionHeading">Popular Courses</h2>
        <div className='sectionHeadingLine'></div>
      </div>
      <Carousel responsive={responsive}>
        {courses.map((course) => (
          <div
            key={course.path}
            className="card course-card m-3"
            style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
            onClick={() => handleCourseClick(course.path)} // Move the onClick handler to the entire card
          >
            <img
              className="card-img-top"
              src={course.imageUrl}
              alt={course.name}
            />
            <div className="card-body mt-2 text-start">
              <p className="card-title">Name: {course.name}</p>
              <p className="card-title">Educator: {course.educator}</p>
              <p className="card-title mt-2">Total Classes: {course.noclasses}</p>
              <p className="card-title">Discount: {course.discount}%</p>
              <p className="card-title">Price: ₹{course.price}</p>
              <StarRatings
                rating={course.rating}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
          </div>
        ))}
      </Carousel>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Homecarousal;
