import express from "express";
import { createBlog, deleteBlog, getCategoryBlogs, getUserBlogs, updateBlog } from "../controller/blogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isBlogOwner } from "../middleware/ownership.middleware.js";

const route = express.Router();

route.post("/createBlog", authMiddleware, createBlog);
route.get("/userBlog", authMiddleware, getUserBlogs);
route.put("/updateBlog/:id", authMiddleware, isBlogOwner, updateBlog);
route.get("/categoryBlog/:category", authMiddleware, getCategoryBlogs);
route.delete("/deleteBlog/:id", authMiddleware, isBlogOwner, deleteBlog);

export default route;
