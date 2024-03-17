import React, { useState, useEffect } from 'react';
import imageUrls from '../teacher/user.jpeg';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const imageUrl = imageUrls;
    const [bookings, setBookings] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/bookings')
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setFilteredBookings(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
        const filtered = bookings.filter(booking =>
            booking.bookings[0].educatorName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            booking.bookings[0].courseName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBookings(filtered);
    };

    const handleApprove = (eduId, courseId, educatorName, courseName , userName ,dateTime, message, userId) => {
        fetch('http://localhost:5000/api/v1/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eduId, courseId, educatorName, courseName , userName ,dateTime, message, userId}),
        })
        .then(response => {
            // Handle response as needed
        })
        .catch(error => {
            console.error('Error approving:', error);
        });
    };

    return (
        <div className='d-flex mt-3'>

            <div className="" style={{ width: '100%' }}>
                <div className="m-3">
                    <input
                        type="text"
                        placeholder="Search bookings by educator or course name"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>

                <div className="m-3">
                    {/* Booking table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"> SNo </th>
                                <th scope="col"> User id </th>
                                <th scope="col"> User </th>
                                <th scope="col"> Educator Id </th>
                                <th scope="col"> Course Id </th>
                                <th scope="col"> Educator Name </th>
                                <th scope="col"> Course Name </th>
                                <th scope="col"> Date Time </th>
                                <th scope="col"> Message </th>
                                <th scope="col"> Approve </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings
                                .slice() 
                                .sort((a, b) => new Date(a.bookings[0].datetime) - new Date(b.bookings[0].datetime)) 
                                .map((booking, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{booking.bookings[0].userId}</td>
                                        <td>{booking.bookings[0].userName}</td>
                                        <td>{booking.bookings[0].eduId}</td>
                                        <td>{booking.bookings[0].courseId}</td>
                                        <td>{booking.bookings[0].educatorName}</td>
                                        <td>{booking.bookings[0].courseName}</td>
                                        <td>{new Date(booking.bookings[0].datetime).toLocaleString()}</td>
                                        <td>{booking.bookings[0].message}</td>
                                        <td>
                                            <button
                                                onClick={() => handleApprove(booking.bookings[0].eduId, booking.bookings[0].courseId, booking.bookings[0].educatorName, booking.bookings[0].courseName,booking.bookings[0].userName ,booking.bookings[0].datetime ,booking.bookings[0].message, booking.bookings[0].userId)}
                                            >
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;