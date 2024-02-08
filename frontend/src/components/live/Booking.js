import React, { useState } from 'react';
import DatePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const Booking = ({ courseId, courseName, edu_id, educator_name }) => {
  const [value, onChange] = useState(new Date());
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datetime: value.toISOString(),
          message
        }),
      });
      if (response.ok) {
        console.log('Booking successful');
        // Optionally, you can perform additional actions after successful booking
      } else {
        console.error('Failed to book:', response.statusText);
      }
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
            <DatePicker onChange={onChange} value={value} style={{ width: 200, color: "black" }}/>
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
