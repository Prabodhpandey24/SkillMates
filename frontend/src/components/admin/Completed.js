import React, { useState, useEffect } from 'react';

const Completed = () => {
    const [completeData, setCompleteData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/done')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Complete Data", data);
                setCompleteData(data.data); // Set the complete data in state
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="m-3">
            <h1>Completed Data</h1>
            {completeData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Educator Name</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Message</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.activeClassDash.userName}</td>
                                <td>{item.activeClassDash.courseName}</td>
                                <td>{item.activeClassDash.educatorName}</td>
                                <td>{item.activeClassDash.datetime}</td>
                                <td>{item.activeClassDash.message}</td>
                                <td>{item.activeClassDash.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No completed data found</p>
            )}
        </div>
    );
};

export default Completed;
