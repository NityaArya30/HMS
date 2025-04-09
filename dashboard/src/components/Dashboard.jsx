import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { isAuthenticated, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); 

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/appointment/getall", { withCredentials: true });
                setAppointments(data.appointments);
            } catch (error) {
                setAppointments([]);
                console.error("Error fetching appointments:", error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true });
                setDoctors(data.doctors);
            } catch (error) {
                setDoctors([]);
                console.error("Error fetching doctors:", error);
            }
        };

        fetchAppointments();
        fetchDoctors();
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <section className='dashboard page'>
                <div className='banner'>
                    <div className='firstBox'>
                        <img src='/doc.png' alt='docImg' />
                        <div className='content'>
                            <div>
                                <p>Hello,</p>
                                <h5>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h5>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div className='secondBox'>
                        <p>Total Appointments</p>
                        <h3>{appointments.length}</h3>
                    </div>
                    <div className='thirdBox'>
                        <p>Registered Doctors</p>
                        <h3>{doctors.length}</h3>
                    </div>
                </div>

                <div className='banner'>
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                        <td>{appointment.appointment_date.substring(0, 16)}</td>
                                        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                        <td>{appointment.department}</td>
                                        <td>
                                            <select
                                                className={appointment.status === "Pending" ? "value-pending" : appointment.status === "Rejected" ? "value-rejected" : "value-accepted"}
                                                value={appointment.status}
                                                onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                                            >
                                                <option value="Pending" className="value-pending">Pending</option>
                                                <option value="Accepted" className="value-accepted">Accepted</option>
                                                <option value="Rejected" className="value-rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td>
                                            {appointment.hasVisited ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        <h3>No Appointments</h3>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
