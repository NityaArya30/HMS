import { useState } from "react";
import { toast } from "react-toastify";


const PrescriptionForm = () => {
    const [prescription, setPrescription] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        prescriptionText: ""
    });

    const handleChange = (e) => {
        setPrescription({ ...prescription, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/v1/prescription/add", {  // Ensure URL is correct
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prescription),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Prescription Added Successfully!");
                setPrescription({ firstName: "", lastName: "", mobileNumber: "", prescriptionText: "" });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error adding prescription:", error);
        }
    };


    return (
        <section className="page">
            <div className="container form-component add-admin-form">
                <img src="/mylogo.jpeg" alt="logo" className="logo" height={100} />
                <h1 className="form-title">ADD PRESCRIPTION</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="firstName" placeholder="First Name" value={prescription.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={prescription.lastName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <input type="number" name="mobileNumber" placeholder="Mobile Number" value={prescription.mobileNumber} onChange={handleChange} required />
                    </div>
                    <textarea name="prescriptionText" placeholder="Enter Prescription" value={prescription.prescriptionText} onChange={handleChange} required></textarea>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">ADD PRESCRIPTION</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PrescriptionForm;