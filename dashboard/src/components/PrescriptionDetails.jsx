import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/prescription/getall", {
          withCredentials: true
        });
        setPrescriptions(data.prescriptions);
      } catch (error) {
        console.log("Error Occurred While Fetching Prescription!", error);
      }
    };
    fetchPrescription();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Filter prescriptions by first or last name
  const filteredPrescriptions = prescriptions.filter((element) => {
    const first = element.firstName?.toLowerCase() || '';
    const last = element.lastName?.toLowerCase() || '';
    return (
      first.includes(searchTerm.toLowerCase()) ||
      last.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className='page messages'>
      <h1>PRESCRIPTIONS</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by First or Last Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          margin: '10px 0 20px 0',
          width: '100%',
          maxWidth: '400px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />

      <div className='banner'>
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((element, index) => (
            <div className='card' key={index}>
              <div className='details'>
                <p>First Name: <span>{element.firstName}</span></p>
                <p>Last Name: <span>{element.lastName}</span></p>
                <p>Contact No.: <span>{element.mobileNumber}</span></p>
                <p>Patient's Prescription: <span>{element.prescriptionText}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h3>No Prescription Found</h3>
        )}
      </div>
    </section>
  );
};

export default PrescriptionPage;
