import React, { useState } from 'react';
import DatePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useNavigate } from "react-router-dom";

const Booking = ({ courseId, courseName, edu_id, educator_name }) => {
  const [value, onChange] = useState(new Date());
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userName = userData.name;
  console.log("User Name:", userName); // Log the user name

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleBooking = async () => {
    try {
      const newBooking = {
        bookings: [{
          eduId: edu_id,
          courseId: courseId,
          userName: userName,
          educatorName: educator_name,
          courseName: courseName,
          datetime: value.toISOString(),
          message: message
        }],
      };

      const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const booking_result = await response.json();
      console.log("booking result", booking_result);
      navigate("/");
    } catch (error) {
      console.error('Error occurred while booking:', error);
    }
  };



  return (
    <div className='container'>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="edu_id" value={edu_id} />
      <div className='card'>
        <h2>Booking for Course: {courseName}</h2>
        <p>Course Name: {courseName}</p>
        <p>Educator Name: {educator_name}</p>
        <div className='card-body align-item-center'>
          <div className="form-group">
            <label>Select Date</label>
            <DatePicker onChange={onChange} value={value} style={{ width: 200, color: "black" }} />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="form-control" value={message} onChange={handleInputChange} rows="3"></textarea>
          </div>
          <button className='btn btn-success mt-2' onClick={handleBooking}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
