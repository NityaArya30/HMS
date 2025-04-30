// models/Bed.js
import mongoose from 'mongoose'

const bedSchema = new mongoose.Schema({
    bedNumber: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'available',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
});

// ✅ Ensure bedNumber+ward combo is unique
bedSchema.index({ bedNumber: 1, ward: 1 }, { unique: true });
export const Bed = mongoose.model("Bed", bedSchema);