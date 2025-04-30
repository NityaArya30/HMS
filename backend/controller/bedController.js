import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Bed } from "../models/bedSchema.js";

// Add a new bed
// controllers/bedController.js
// const Bed = require('../models/Bed');

export const addBed = async (req, res) => {
    try {
        const { bedNumber, ward } = req.body;

        if (!bedNumber || !ward) {
            return res.status(400).json({ success: false, message: "Bed Number and Ward are required" });
        }

        const exists = await Bed.findOne({ bedNumber, ward });
        if (exists) {
            return res.status(400).json({ success: false, message: "This bed already exists in the selected ward" });
        }

        const newBed = await Bed.create({ bedNumber, ward });
        res.status(201).json({ success: true, bed: newBed });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "Duplicate bed for this ward" });
        }
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Allot or Release a bed
export const updateBedStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;  // This is where the bed ID is coming from
    const { status, assignedTo } = req.body;

    const bed = await Bed.findById(id);
    if (!bed) {
        return next(new ErrorHandler("Bed not found", 404));
    }

    if (status === 'occupied' && assignedTo) {
        bed.assignedTo = assignedTo;
    } else {
        bed.assignedTo = null;
    }

    bed.status = status;
    await bed.save();

    res.status(200).json({
        success: true,
        message: `Bed status updated to ${status}`,
        bed,
    });
});

// Get all beds with patient info
export const getAllBeds = catchAsyncErrors(async (req, res, next) => {
    const beds = await Bed.find()
        .populate("assignedTo", "firstName lastName email") // Populate with patient name and email
        .sort({ bedNumber: 1 });

    res.status(200).json({
        success: true,
        beds,
    });
});

// Bed summary
export const getBedSummary = catchAsyncErrors(async (req, res, next) => {
    const occupiedBeds = await Bed.countDocuments({ status: "occupied" });
    const availableBeds = await Bed.countDocuments({ status: "available" });

    res.status(200).json({
        success: true,
        summary: {
            occupiedBeds,
            availableBeds,
            totalBeds: occupiedBeds + availableBeds,
        },
    });
});

// Delete bed
export const deleteBed = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const bed = await Bed.findById(id);
    if (!bed) {
        return next(new ErrorHandler("Bed not found", 404));
    }

    await bed.deleteOne();

    res.status(200).json({
        success: true,
        message: "Bed deleted successfully",
    });
});