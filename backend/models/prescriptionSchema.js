import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters!"]
    },
    mobileNumber: {
        type: String,
        required: true,
        minLength: [10, "Phone Number must contain exactly 10 digits!"],
        maxLength: [10, "Phone Number must contain exactly 10 digits!"],
    },
    prescriptionText: {
        type: String,
        required: true
    }
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
