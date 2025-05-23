import express from "express";
import {config} from "dotenv" 
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import {errorMiddleware} from "./middlewares/errorMiddleware.js"
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import prescriptionRouter from "./router/prescriptionRouter.js"
import medicineRouter from "./router/medicineRouter.js"
import bedRouter from "./router/bedRouter.js"

const app = express();
config({path: "./config/config.env"});
//middleware creation: CONNECTING frontend and backend
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
//middleware to create cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/prescription",prescriptionRouter);
app.use("/api/v1/beds",bedRouter);
app.use("/api/v1/medicine",medicineRouter);
app.use((req, res) => {
    res.status(404).json({
      message: `Route Not Found: ${req.originalUrl}`,
    });
  });



dbConnection();
app.use(errorMiddleware);
export default app;