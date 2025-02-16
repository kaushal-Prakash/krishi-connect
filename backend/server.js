import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";

dotenv.config();

connectDB(process.env.MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
