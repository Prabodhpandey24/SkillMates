import React, { useState, useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import '../homecarousel/Homecarousal.css';
import { Link } from 'react-router-dom'; // Import Link
import Home from "./img/homeIcon.png";

const WhyUsPage = () => {

	const [whyUs, setwhyUs] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/api/v1/whyUs`)
		  .then((response) => response.json())
		  .then((data) => setwhyUs(data))
		  .catch((error) => console.error("Error fetching course details:", error));
	  }, []);

	//   console.log("jsjsjhds>>", whyUs);

  return (
    <div className="container my-5">
      <div className="py-5">
        <h2 className="sectionHeading">
          Why Skill Mates
        </h2>
        <div className='sectionHeadingLine'></div>
      </div>
	  <div className='row'>
		{whyUs.map((why)=>(
			<div className='col-sm-4'  key={why._id}>
			<div className='smallCard'>
				<div className='mainSmallCard align-items-center'>
					<img className="mainSmallCardIcon" src={why.imageUrl} alt="home" />
					<div className='text-start ps-3'>
						<h3>{why.heading}</h3>
						<p className='mb-0'>{why.description}</p>
					</div>
				</div>
			</div>
		</div>
		))}
		
	  </div>
    </div>
  );
};

export default WhyUsPage;
