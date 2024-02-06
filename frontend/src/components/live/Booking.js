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

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking logic goes here');
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
          <div class="form-group">
            <label>Select Date</label>
            <DatePicker onChange={onChange} value={value} style={{ width: 200, color: "black" }}/>
            <div class="form-group">
              <label>Message</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
          <button className='btn btn-success mt-2' onClick={handleBooking}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
