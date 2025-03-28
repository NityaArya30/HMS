import mongoose from "mongoose";
import validator from "validator";
const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name contains atleast 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First Name contains atleast 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain exact 11 digits!"],
        maxLength: [11, "Phone Number Must Contain exact 11 digits!"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message Must Contain at least 10 Characters!"],
    },
});

export const Message = mongoose.model("Message", messageSchema);