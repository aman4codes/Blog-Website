import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {

        // Get token from headers
        const authHeader = req.headers.authorization;

        // Check token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Attach user data
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};