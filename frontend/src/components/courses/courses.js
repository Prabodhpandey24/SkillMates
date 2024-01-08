import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoginModal from '../Modal/LoginModal'; 

const CourseDetail = () => {
  const { path } = useParams();
  const [courses, setCourses] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("path:", path);

    fetch(`http://localhost:5000/api/v1/courses/${path}`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching course details:", error));

    const modalTimeout = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(modalTimeout);
    
  }, [path]);


  if (!courses || Object.keys(courses).length === 0) {
    return <p>Loading...</p>;
  }

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

  console.log("courses>", courses.imageUrl)

  return (
    <div className="container my-5">
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      <div className="row">
        <div className="col-lg-7">
          <div className="p-5 mt-4 text-start">
            <h1 className="display-4">{courses.name}</h1>
            <p className="card-title">Name: {courses.description}</p>
            <p className="card-title">Educator: {courses.educator}</p>
            <p className="card-title">Discount: {courses.discount}%</p>
            <p className="card-title">Price: ₹{courses.price}</p>
          </div>
        </div>
        <div className="col-lg-5">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src={courses.imageUrl}
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
  );
};

export default CourseDetail;
