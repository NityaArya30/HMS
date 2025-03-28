import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Must Contain exact 13 digits!"],
        maxLength: [13, "NIC Must Contain exact 13 digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String, 
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password Must Contain at least 8 characters!"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    },
});

userSchema.pre("save", async function(next) {
    //user jab register krega to naya pass aaega
    if(!this.isModified("password")) {
        next();
    }
    //naye pass ko bcrypt krdega jo hack nhi ho skta hash form m hai
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}

export const User = mongoose.model("User", userSchema);