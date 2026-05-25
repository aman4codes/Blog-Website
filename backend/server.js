import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",authRoutes);


app.listen(3000, () => {
    console.log("Server is connected and running on port 3000");
});