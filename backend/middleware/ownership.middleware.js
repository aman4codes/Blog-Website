import prisma from "../config/db.js";

export const isBlogOwner = async (req, res, next) => {
    try {

        const blogId = Number(req.params.id);

        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        });

        // Blog not found
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Check ownership
        if (blog.authorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Optional
        // req.blog = blog;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};