import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SchoolForm from './SchoolForm';

const School = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/submitSchoolForm'); 
      const data = await response.json();
      console.log("getting response data", data);
      setSchoolData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      width: '750px',
      margin: 'auto',
    }
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between border'>
        <h3>School</h3>
        <div>
          <button className='btn btn-primary' onClick={openModal}>Form</button>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
            <div onClick={closeModal} style={{ position: 'absolute', top: '18px', right: '18px', cursor: 'pointer' }}>X</div>
            <SchoolForm />
          </Modal>
        </div>
      </div>
      <div>
        <h4>School Data:</h4>
        <ul>
          {schoolData.map((school, index) => (
            <div>
            <h5>Active School Classes:</h5>
            <ul>
              {school.activeschoolClassDash.map((activeClass, idx) => (
                <li key={idx}>
                  <div>School Name: {activeClass.schoolName}</div>
                  <div>Class Duration: {activeClass.classDuration}</div>
                  <div>School Name: {activeClass.activeLink}</div>
                  <div>Class Duration: {activeClass.educatorName}</div>
                  <div>School Name: {activeClass.courseName}</div>
                  <div>Class Duration: {activeClass.userName}</div>
                  <div>School Name: {activeClass.datetime}</div>
                  <div>Class Duration: {activeClass.message}</div>
                </li>
              ))}
            </ul>
          </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default School;
