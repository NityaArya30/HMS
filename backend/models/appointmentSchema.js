import mongoose from "mongoose";
import validator from "validator";
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "last Name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a valid Email!!!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number must contains  Exact 10 Digits"],
        maxLength: [11, "Phone Number must contains  Exact 11 Digits"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC  must contains  Exact 13 Digits"],
        maxLength: [13, "NIC  must contains  Exact 13 Digits"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVistited: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);