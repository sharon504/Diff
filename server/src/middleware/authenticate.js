import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.data = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { authenticate };
