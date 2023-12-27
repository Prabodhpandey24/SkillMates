import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { path } = useParams();
    const [courses, setCourses] = useState({});

    useEffect(() => {
        console.log('path:', path);

        fetch(`http://localhost:5000/api/v1/courses/${path}`)
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching course details:', error));
    }, [path]);

    if (!courses || Object.keys(courses).length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    <img className="w-100 shadow" src={courses.imageUrl} alt={courses.name} />
                </div>
                <div className="col-lg-6">
                    <div className="p-5 mt-4">
                        <h1 className="display-4">{courses.name}</h1>
                        <p className="card-title">Name: {courses.description}</p>
                        <p className="card-title">Educator: {courses.educator}</p>
                        <p className="card-title">Discount: {courses.discount}%</p>
                        <p className="card-title">Price: ₹{courses.price}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CourseDetail;
