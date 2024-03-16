import React, { useState, useEffect } from 'react';
import imageUrls from '../teacher/user.jpeg';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import School from './School';
import Analyticshool from './Analytics';
import Settingschool from './Setting';
import Pending from './Pending';
import Completed from './Completed';



const Admindashboard = () => {
    const imageUrl = imageUrls;
    const [currentComponent, setCurrentComponent] = useState('dashboard');

    const handleLinkClick = (componentName) => {
        setCurrentComponent(componentName);
    };
    return (
        <div className='d-flex mt-3'>
            <div className="flex-row">
                <div className='container border' style={{ height: '75px' }}>
                    <Link to="/"><h3 className='mt-3'>Skill Mates</h3></Link>
                </div>
                <div className='container mt-3' style={{ height: '780px', width: '280px', backgroundColor: 'rgba(0,0,255,.1)' }}>
                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('dashboard')}>Dashboard</Link>
                    </div>

                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('school')}>School</Link>
                    </div>

                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('analyticschool')}>Analytics</Link>
                    </div>

                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('settingschool')}>Setting</Link>
                    </div>

                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('pending')}>Pending</Link>
                    </div>

                    <div className='p-3'>
                        <Link to="#" onClick={() => handleLinkClick('completed')}>Completed</Link>
                    </div>
                </div>
            </div>

            <div className="" style={{ width: '100%' }}>
                <div className="border d-flex justify-content-between align-items-center" style={{ height: '75px' }}>
                    <div className='m-3'>
                        <div className=' d-flex'>
                            <div className='me-2'>
                                <Link to="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                                    </svg>
                                </Link>
                            </div>
                            <Link to=""><h5>Notify</h5></Link>
                        </div>
                    </div>

                    <div className='m-3'>
                        <div className=' d-flex'>
                            <div className='me-2'>
                                <Link to="">
                                    <h3>
                                        <b> Admin Dashboard </b>
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='m-3'>
                        <div className=' d-flex'>
                            <div className='rounded-image-container me-3'>
                                <img
                                    src={imageUrl}
                                    alt="User image"
                                    style={{ width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer' }}
                                />
                            </div>
                            <h5></h5>
                            <div className='ms-2'>
                                <Link to="/" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-3">
                    {currentComponent === 'dashboard' && <Dashboard />}
                    {currentComponent === 'school' && <School />}
                    {currentComponent === 'analyticschool' && <Analyticshool />}
                    {currentComponent === 'settingschool' && <Settingschool />}
                    {currentComponent === 'pending' && <Pending />}
                    {currentComponent === 'completed' && <Completed />}
                </div>
            </div>
        </div>
    );
};

export default Admindashboard;