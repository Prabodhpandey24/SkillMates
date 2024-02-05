import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  return (
    <div>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <TimePicker onChange={onChange} value={value} />
    </div>
  )
}

export default Booking;
