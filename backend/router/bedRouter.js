import express from 'express';
import {addBed,updateBedStatus,getAllBeds,getBedSummary,deleteBed} from "../controller/bedController.js"

const router = express.Router();

// Route to add a new bed
// POST /api/v1/beds/add
router.post('/add', addBed);

// Route to update bed status and assigned patient
// PUT /api/v1/beds/update/:id
router.put('/update/:id', updateBedStatus);

// Route to get all beds with assigned patient information
// GET /api/v1/beds/all
router.get('/all', getAllBeds);

// Route to get the summary of bed usage (occupied/available counts)
// GET /api/v1/beds/summary
router.get('/summary', getBedSummary);

// Route to delete a bed
// DELETE /api/v1/beds/delete/:id
router.delete('/delete/:id', deleteBed);

export default router;