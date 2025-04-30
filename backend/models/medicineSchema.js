import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
    minLength: [2, "Medicine name must contain at least 2 characters"],
  },
  price: {
    type: Number,
    required: true,
  },
  mediAvatar: {
    public_id: String,
    url: String,
  },
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
