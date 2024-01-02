import React, { useState, useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import '../homecarousel/Homecarousal.css';
import { Link } from 'react-router-dom'; // Import Link
import Home from "./img/homeIcon.png";

const WhyUsPage = () => {

  return (
    <div className="container my-5">
      <div className="py-5">
        <h2 className="sectionHeading">
          Why Skill Mates
        </h2>
        <div className='sectionHeadingLine'></div>
      </div>
	  <div className='row'>
		<div className='col-sm-4'>
			<div className='smallCard'>
				<div className='mainSmallCard align-items-center'>
					<img className="mainSmallCardIcon" src={Home} alt="home" />
					<div className='text-start ps-3'>
						<h3>300+</h3>
						<p className='mb-0'>Different Courses</p>
					</div>
				</div>
			</div>
		</div>
		<div className='col-sm-4'>
			<div className='smallCard'>
				<div className='mainSmallCard align-items-center'>
					<img className="mainSmallCardIcon" src={Home} alt="home" />
					<div className='text-start ps-3'>
						<h3>300+</h3>
						<p className='mb-0'>Different Courses</p>
					</div>
				</div>
			</div>
		</div>
		<div className='col-sm-4'>
			<div className='smallCard'>
				<div className='mainSmallCard align-items-center'>
					<img className="mainSmallCardIcon" src={Home} alt="home" />
					<div className='text-start ps-3'>
						<h3>300+</h3>
						<p className='mb-0'>Different Courses</p>
					</div>
				</div>
			</div>
		</div>
	  </div>
    </div>
  );
};

export default WhyUsPage;
