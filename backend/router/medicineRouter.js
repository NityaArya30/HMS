import express from "express";
import { AddNewMedi, getAllMedicines } from "../controller/medicineController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addnew", isAdminAuthenticated, AddNewMedi);  
router.get("/all", isAdminAuthenticated, getAllMedicines);  

export default router;
