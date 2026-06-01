import prisma from "../config/db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).json({
                message: "Required information missing"
            })
        }

        if (await prisma.user.findUnique({ where: { email } })) {
            return res.status(400).json({
                message: "User already exists,Please Login!!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword
            }

        })

        const token = jwt.sign(
            {
                id: newUser.id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d"
            }
        )

        return res.status(201).json({
            message: "User Registered Successfully",
            token
        })
    }
    catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: error.message || "Some Unexpected error Occurred",
            error: error
        })
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user?.id;

        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Get user info error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Unable to fetch user info"
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Required information missing"
            })
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: "User Doesn't exists,Please Register first!!"
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1d"
                }
            )

            return res.status(200).json({
                message: "User Logged  in Successfully",
                token
            })
        } else {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Some Unexpected error Occurred"
        })
    }
}