import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB(process.env.MONGO_URI).then(() => console.log("✅ MongoDB Connected"));

const app = express();

app.use(cors(
    {origin: ["http://localhost:3000"],
    credentials: true}
));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;


app.use("/users", userRoutes);
app.use("/farmers", farmerRoutes);
app.use("/admin", adminRoutes);
app.use("/store", storeRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
