import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Prescription } from "../models/prescriptionSchema.js";

// ADD NEW PRESCRIPTION
export const addPrescription = catchAsyncErrors(async (req, res, next) => {
    try {
        const { firstName, lastName, mobileNumber, prescriptionText } = req.body;

        // Debugging: Log incoming request
        console.log("Received Data:", req.body);

        if (!firstName || !lastName || !mobileNumber || !prescriptionText) {
            return next(new ErrorHandler("Please provide all details!", 400));
        }

        const prescription = await Prescription.create({
            firstName,
            lastName,
            mobileNumber,
            prescriptionText
        });

        console.log("Prescription Saved:", prescription);  // Debugging

        res.status(201).json({
            success: true,
            message: "Prescription added successfully!",
            prescription
        });

    } catch (error) {
        console.error("Error saving prescription:", error);
        return next(new ErrorHandler("Server error, could not save prescription", 500));
    }
});


// GET ALL PRESCRIPTIONS
export const getAllPrescriptions = catchAsyncErrors(async (req, res, next) => {
    const prescriptions = await Prescription.find();
    res.status(200).json({
        success: true,
        prescriptions
    });
});

// GET PRESCRIPTION BY ID
export const getPrescriptionById = catchAsyncErrors(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
        return next(new ErrorHandler("Prescription not found!", 404));
    }

    res.status(200).json({
        success: true,
        prescription
    });
});

// DELETE PRESCRIPTION
export const deletePrescription = catchAsyncErrors(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
        return next(new ErrorHandler("Prescription not found!", 404));
    }

    await prescription.deleteOne();

    res.status(200).json({
        success: true,
        message: "Prescription deleted successfully!"
    });
});
