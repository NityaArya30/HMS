import express from "express";
import {isAdminAuthenticated} from "../middlewares/auth.js"
import { addPrescription, getAllPrescriptions, getPrescriptionById, deletePrescription } from "../controller/prescriptionController.js";
// import { isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to add a new prescription (only authenticated patients can add)
router.post("/add", addPrescription);

// Route to get all prescriptions
router.get("/getall",isAdminAuthenticated, getAllPrescriptions);

// Route to get a single prescription by ID
router.get("/:id",getPrescriptionById);

// Route to delete a prescription by ID
router.delete("/:id", deletePrescription);

export default router;
