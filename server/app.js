import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/noteRouter.js";
import cors from "cors";
import aiRouter from "./routes/aiRouter.js";

const PORT=process.env.PORT;

dotenv.config();
const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());
connectDB();

app.use("/api/auth",authRouter);
app.use("/api/notes",noteRouter);
app.use("/api/ai",aiRouter);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})