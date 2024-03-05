// SchoolForm.js
import React, { useState } from 'react';

const SchoolForm = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    classDuration: '',
    activeLink: '',
    educatorName: '',
    courseName: '',
    userName: '',
    datetime: '',
    message: '',
    eduId: '',
    courseId: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/submitSchoolForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      setFormData({
        schoolName: '',
        classDuration: '',
        activeLink: '',
        educatorName: '',
        courseName: '',
        userName: '',
        datetime: '',
        message: '',
        eduId: '',
        courseId: ''
      });
      
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div>
      <h2>School Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="schoolName">School Name:</label>
          <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="classDuration">Class Duration:</label>
          <input type="text" id="classDuration" name="classDuration" value={formData.classDuration} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="activeLink">Active Link:</label>
          <input type="text" id="activeLink" name="activeLink" value={formData.activeLink} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="educatorName">Educator Name:</label>
          <input type="text" id="educatorName" name="educatorName" value={formData.educatorName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="datetime">Date and Time:</label>
          <input type="datetime-local" id="datetime" name="datetime" value={formData.datetime} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="eduId">Education ID:</label>
          <input type="text" id="eduId" name="eduId" value={formData.eduId} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="courseId">Course ID:</label>
          <input type="text" id="courseId" name="courseId" value={formData.courseId} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SchoolForm;
