import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import LoginModal from '../Modal/LoginModal'; 
import  "../courses/courses.css"
import "../../styles/styles.css";
import { Link, Element } from 'react-scroll';

const CourseDetail = () => {
  const { path } = useParams();
  const [courses, setCourses] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <div className="container my-5">
      {showModal && !localStorage.user && <LoginModal onClose={() => setShowModal(false)} />}
      <div className="row pb-5">
        <div className="col-lg-7">
          <div className="pb-4 mt-4 text-start">
            <h1 className="heading">{courses.name}</h1>
            <p className="card-title">{courses.description}</p>
            {/* <p className="card-title">Educator: {courses.educator.map(ed => ed.educator_name).join(', ')}</p>
            <p className="card-title">Discount: {courses.discount}%</p> */}
            <p className="card-title pt-3 prices">₹{courses.price}</p>
          </div>
          <div className="justify-content-start d-flex">
              <a href="#" className="LogBtn">
                  Buy this Course
                </a>
                <a href="#" className="LogBtn ms-4">
                  Wishlist
                </a>
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
      <div>
      <nav className="navForCourse pt-5">
        <Link
          to="section1"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => handleTabClick('tab1')}
          active={activeTab === 'tab1'}
          style={{paddingLeft: "0"}}
          className={activeTab === 'tab1' ? `navForCourseActive` : null}
        >
          Overview
        </Link>
        <Link
          to="section2"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => handleTabClick('tab2')}
          active={activeTab === 'tab2'}
          className={activeTab === 'tab2' ? `navForCourseActive` : null}
        >
          About
        </Link>
        <Link
          to="section3"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => handleTabClick('tab3')}
          active={activeTab === 'tab3'}
          className={activeTab === 'tab3' ? `navForCourseActive` : null}
        >
          Certification
        </Link>
        <Link
          to="section4"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => handleTabClick('tab4')}
          active={activeTab === 'tab4'}
          className={activeTab === 'tab4' ? `navForCourseActive` : null}
        >
        Reviews
        </Link>
        <Link
          to="section5"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => handleTabClick('tab5')}
          active={activeTab === 'tab5'}
          className={activeTab === 'tab5' ? `navForCourseActive` : null}
        >
          FAQs
        </Link>
      </nav>

      <div className="">
        <Element name="section1">
            <div className='d-flex justify-contents-start pt-5'>
              <h4>What you'll learn</h4>
            </div>
            <div>
            <ul className="row ps-0" style={{listStyle: 'initial'}}>
              <li className="col-sm-5 text-start pt-4">What generative AI is and how it works, its common use cases, and what this technology can and cannot do.</li>
              <li className="col-sm-5 text-start pt-4">What generative AI is and how it works, its common use cases, and what this technology can and cannot do.</li>
              <li className="col-sm-5 text-start pt-4">What generative AI is and how it works, its common use cases, and what this technology can and cannot do.</li>
            </ul> 
            </div>
            <div className='d-flex justify-contents-start pt-5'>
              <h4>Skills you'll gain</h4>
            </div>
            <div>
            <ul className="row ps-0 pt-3 skillYouHave">
              <li className="col-sm-3 text-start listTags ms-0">Abcd</li>
              <li className="col-sm-3 text-start listTags">Efgh</li>
              <li className="col-sm-3 text-start listTags">Ijklms</li>
              <li className="col-sm-3 text-start listTags">Ijklms</li>
            </ul> 
            </div>
        </Element>
        
      </div>
    </div>
    </div>
  );
};

export default CourseDetail;
