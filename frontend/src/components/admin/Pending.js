import React, { useState, useEffect } from 'react';

const Pending = () => {
    const [pendingData, setPendingData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/pending')
            .then((response) => response.json())
            .then((data) => {
                console.log("Pending Data", data);
                setPendingData(data.data); // Set the pending data in state
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="m-3">
            <h1>Pending Data</h1>
            {pendingData.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Educator Name</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.activeClassDash.userName}</td>
                                <td>{item.activeClassDash.courseName}</td>
                                <td>{item.activeClassDash.educatorName}</td>
                                <td>{item.activeClassDash.datetime}</td>
                                <td>{item.activeClassDash.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending data found</p>
            )}
        </div>
    );
};

export default Pending;
