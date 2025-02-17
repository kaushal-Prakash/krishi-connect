import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

connectDB(process.env.MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
