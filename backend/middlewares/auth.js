import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

//AUTHENTICATION
export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    //AUTHORISATION
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(` ${req.user.role} not authorised for this resources!`, 
            403
        )
    );
    }
    next();
})


export const isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken;
    if(!token) {
        return next(new ErrorHandler("Patient Not Authenticated!", 400));
    }
    //AUTHORISATION
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient") {
        return next(new ErrorHandler(` ${req.user.role} not authorised for this resources!`, 
            403
        )
    );
    }
    next();
})

