import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import "../BedManage.css"

const BedManagement = () => {
    const { isAuthenticated } = useContext(Context);

    const [beds, setBeds] = useState([]);
    const [patients, setPatients] = useState([]);
    const [bedNumber, setBedNumber] = useState('');
    const [ward, setWard] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [statusSummary, setStatusSummary] = useState({ occupiedBeds: 0, availableBeds: 0 });
    const [isBedAdded, setIsBedAdded] = useState(false);

    const wards = ["A", "B", "C", "D", "E"];
    const bedNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

    useEffect(() => {
        fetchBeds();
        fetchSummary();
        fetchPatients();
    }, []);

    const fetchBeds = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/beds/all');
            setBeds(data.beds);
        } catch (error) {
            toast.error("Failed to load beds", error);
        }
    };

    const fetchSummary = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/beds/summary');
            setStatusSummary(data.summary);
        } catch (error) {
            console.error("Error fetching summary", error);
        }
    };

    const fetchPatients = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/user/patients');
            setPatients(data.patients);
        } catch (error) {
            toast.error("Failed to load patients", error);
        }
    };

    const handleAddBed = async () => {
        if (!bedNumber || !ward) {
            toast.error("Please select both ward and bed number");
            return;
        }

        // Dynamically generate the bed name like A-1, B-5 etc.
        const bedName = `${ward}-${bedNumber}`;

        const alreadyExists = beds.some(bed => bed.bedNumber === bedName && bed.ward === ward);
        if (alreadyExists) {
            toast.error("This bed already exists in the selected ward");
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/v1/beds/add', { bedNumber: bedName, ward });
            toast.success('Bed added successfully');
            setBedNumber('');
            setWard('');
            setIsBedAdded(true);
            fetchBeds();
            fetchSummary();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding bed');
        }
    };

    const assignPatientToBed = async (bedId) => {
        try {
            if (!selectedPatient) {
                toast.error("Please select a patient");
                return;
            }

            await axios.put(`http://localhost:4000/api/v1/beds/update/${bedId}`, {
                status: 'occupied',
                assignedTo: selectedPatient,
            });
            toast.success("Bed assigned to patient");
            setSelectedPatient('');
            fetchBeds();
            fetchSummary();
        } catch (error) {
            toast.error("Failed to assign patient to bed", error);
        }
    };

    const deleteBed = async (bedId) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/beds/delete/${bedId}`);
            toast.success("Bed deleted successfully");
            fetchBeds();
            fetchSummary();
        } catch (error) {
            toast.error("Failed to delete bed", error);
        }
    };

    // Dynamic logic to update available and occupied beds per ward
    const getAvailableAndOccupiedBeds = (ward) => {
        const wardBeds = beds.filter(bed => bed.ward === ward);
        const occupied = wardBeds.filter(bed => bed.status === 'occupied').length;
        const available = 20 - occupied; // As there are 20 beds per ward
        return { occupied, available };
    };

    // 🔐 Redirect to login if user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="bed-container">
            <h2>🛏️ Bed Management</h2>

            {/* Ward Selection and Bed Assignment */}
            <div className="summary">
                {wards.map((w) => {
                    const { available, occupied } = getAvailableAndOccupiedBeds(w);
                    return (
                        <div key={w}>
                            <p><strong>Ward {w} - Available:</strong> {available} | <strong>Occupied:</strong> {occupied}</p>
                        </div>
                    );
                })}
            </div>

            {/* Ward and Bed Selection */}
            <div className="add-bed">
                <select value={ward} onChange={(e) => setWard(e.target.value)}>
                    <option value="">Select Ward</option>
                    {wards.map((w, idx) => (
                        <option key={idx} value={w}>Ward {w}</option>
                    ))}
                </select>

                <select value={bedNumber} onChange={(e) => setBedNumber(e.target.value)}>
                    <option value="">Select Bed Number</option>
                    {bedNumbers.map((b, idx) => (
                        <option key={idx} value={b}>{b}</option>
                    ))}
                </select>

                <button onClick={handleAddBed}>Add Bed</button>
            </div>

            {isBedAdded && (
                <div className="assign-bed">
                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                        <option value="">Select a Patient</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.firstName} {patient.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="bed-list">
                {beds.map((bed) => (
                    <div
                        className={`bed-card ${bed.status === 'occupied' ? 'occupied' : 'available'}`}
                        key={bed._id}
                    >
                        <p><strong>Bed:</strong> {bed.bedNumber}</p>
                        <p><strong>Ward:</strong> {bed.ward}</p>
                        <p><strong>Status:</strong> {bed.status}</p>
                        <p><strong>Assigned To:</strong> {bed.assignedTo ? `${bed.assignedTo.firstName} ${bed.assignedTo.lastName}` : 'N/A'}</p>
                        <div className="btn-group">
                            <button
                                onClick={() => assignPatientToBed(bed._id)}
                                disabled={bed.status === 'occupied'}
                                className="assign-btn"
                            >
                                Assign Patient
                            </button>
                            <button onClick={() => deleteBed(bed._id)} className="delete">
                                Delete Bed
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BedManagement;