import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SchoolForm from './SchoolForm';

const School = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const customStyles = {
    content: {
      width: '750px',
      margin: 'auto',
    }
  };

  // Filter schoolData based on searchInput
  const filteredData = schoolData.filter(school => {
    return school.activeschoolClassDash.some(data => {
      return (
        data.schoolName.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.educatorName.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  });

  return (
    <div className='container'>
      <div className='d-flex justify-content-between border border-2'>
        <h3 className='m-3'>School</h3>
        <div className="m-3 w-50">
          <input
            type="text"
            placeholder="Search by educator or School name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='m-3'>
          <button className='btn btn-primary' onClick={openModal}>Add School</button>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
            <div onClick={closeModal} style={{ position: 'absolute', top: '18px', right: '18px', cursor: 'pointer' }}>X</div>
            <SchoolForm />
          </Modal>
        </div>
      </div>

      <div className="m-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">School Name</th>
              <th scope="col">Class Duration</th>
              <th scope="col">Active Link</th>
              <th scope="col">Educator Name</th>
              <th scope="col">Course Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Datetime</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(school => (
              school.activeschoolClassDash.map((data, index) => (
                <tr key={index}>
                  <td>{data.schoolName}</td>
                  <td>{data.classDuration}</td>
                  <td>{data.activeLink}</td>
                  <td>{data.educatorName}</td>
                  <td>{data.courseName}</td>
                  <td>{data.userName}</td>
                  <td>{data.datetime}</td>
                  <td>{data.message}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default School;
