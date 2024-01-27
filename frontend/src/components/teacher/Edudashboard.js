import React, { useState, useEffect } from 'react';
import imageUrls from '/home/ritesh/My_Space/SkillMates/frontend/src/components/teacher/user.jpeg'

const Edudashboard = () => {
    const [teacherLogins, setTeacherLogins] = useState([]);
    const auth = localStorage.getItem("user");
    const imageUrl = imageUrls;
    const logout = () => {
        localStorage.removeItem("Eduuser");
        console.warn("Mango");
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/teacherlogins')
            .then((response) => response.json())
            .then((data) => {
                setTeacherLogins(data);
                console.warn('Fetched Data:', data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='d-flex mt-3'>
            <div className="flex-row">
                <div className='container border' style={{ height: '75px' }}>
                    <a href=""><h3 className='mt-3'>Skill Mates</h3></a>
                </div>
                <div className='container mt-3' style={{ height: '780px', width: '280px', backgroundColor: 'rgba(0,0,255,.1)' }}>
                    <div className='p-3'>
                        <a href=""><h5>Dashboard</h5></a>
                    </div>

                    <div className='p-3'>
                        <a href=""><h5>Courses</h5></a>
                    </div>

                    <div className='p-3'>
                        <a href=""><h5>Analytics</h5></a>
                    </div>

                    <div className='p-3'>
                        <a href=""><h5>Setting</h5></a>
                    </div>
                </div>
            </div>

            <div className="" style={{ width: '100%' }}>
                <div className="border d-flex justify-content-between align-items-center" style={{ height: '75px' }}>
                    <div className='m-3'>
                        <div className=' d-flex'>
                            <div className='me-2'>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                                    </svg>
                                </a>
                            </div>
                            <a href=""><h5>Notify</h5></a>
                        </div>
                    </div>
                    <div className='m-3'>
                        <div className=' d-flex'>
                            <div className='rounded-image-container me-3'>
                                <img
                                    src={imageUrl}
                                    alt="User image"
                                    style={{ width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer' }}
                                    title={teacherLogins.length > 0 ? teacherLogins[0].name : ''}
                                />
                            </div>
                            <h5>{teacherLogins.length > 0 ? teacherLogins[0].name : ''}</h5>
                            <div className='ms-2'>
                                <a href="/" onClick={logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">SNo</th>
                                <th scope="col">dateDay</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">School Name</th>
                                <th scope="col">Class Duration</th>
                                <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherLogins.map((teacher, index) => (
                                teacher.activeClassDash.map((activeClass, innerIndex) => (
                                    <tr key={`${index}-${innerIndex}`}>
                                        <th>{activeClass.serialNo}</th>
                                        <td>{activeClass.dateDay}</td>
                                        <td>{activeClass.courseName}</td>
                                        <td>{activeClass.schoolName}</td>
                                        <td>{activeClass.classDuration}</td>
                                        <td><a href="">{activeClass.activeLink}</a></td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Edudashboard;