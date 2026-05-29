import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);


app.listen(3000, () => {
    console.log("Server is connected and running on port 3000");
});