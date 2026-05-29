import prisma from "../config/db.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, isPublic, category } = req.body;
        const userId = req.user.id;

        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                isPublic,
                category,

                author: {
                    connect: {
                        id: userId
                    }
                }
            },

            include: {
                author: true
            }
        });

        return res.status(201).json({
            success: true,
            blog
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const allUserBlog = async (req, res) => {
    try {

        const blogs = await prisma.blog.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserBlogs = async (req, res) => {
    try {
        const userId = req.user.id;

        const blogs = await prisma.blog.findMany({
            where: {
                authorId: userId
            },

            include: {
                author: true
            }
        });

        return res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCategoryBlogs = async (req, res) => {
    try {
        const { category } = req.params;

        const blogs = await prisma.blog.findMany({
            where: {
                category
            },

            include: {
                author: true
            }
        });

        return res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, content, category, isPublic } = req.body;

        const updatedBlog = await prisma.blog.update({
            where: {
                id: Number(id)
            },

            data: {
                title,
                content,
                category,
                isPublic
            }
        });

        return res.status(200).json({
            success: true,
            updatedBlog
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.blog.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};