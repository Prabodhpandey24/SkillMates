import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState({});

    useEffect(() => {
        console.log('CourseId:', courseId);

        fetch(`http://localhost:5000/api/v1/courses/${courseId}`)
            .then((response) => response.json())
            .then((data) => setCourseDetails(data))
            .catch((error) => console.error('Error fetching course details:', error));
    }, [courseId]);

    if (!courseDetails || Object.keys(courseDetails).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div class="container my-5">
            <div class="row">
                <div class="col-lg-6">
                    <img class="w-100 shadow" src={courseDetails.imageUrl}/>
                </div>
                <div class="col-lg-6">
                    <div class="p-5 mt-4">
                        <h1 class="display-4">{courseDetails.name}</h1> 
                        <p className="card-title">Name: {courseDetails.description}</p>
                        <p className="card-title">Educator: {courseDetails.educator}</p>
                        <p className="card-title">Discount: {courseDetails.discount}%</p>
                        <p className="card-title">Price:  ₹{courseDetails.price}</p>
                    </div>
                </div>
            </div>
        </div>
            );
};

            export default CourseDetail;
