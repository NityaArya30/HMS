import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Medicine } from "../models/medicineSchema.js";
import cloudinary from "cloudinary";

export const AddNewMedi = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Medicine Avatar Required!", 400));
  }

  const { mediAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(mediAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const { medicineName, price } = req.body;

  if (!medicineName || !price || !mediAvatar) {
    return next(new ErrorHandler("Please Provide Complete Details!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(mediAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
    return next(new ErrorHandler("Failed to upload medicine Avatar", 500));
  }

  const medicine = await Medicine.create({
    medicineName,
    price,
    mediAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Medicine Added",
    medicine,
  });
});
export const getAllMedicines = catchAsyncErrors(async(req, res, next) => {
    const medicines = await Medicine.find();
    res.status(200).json({
        success: true,
        medicines
    });
});
