import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const userSave = await user.save();
        res.status(201).json(userSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ "contact.email": email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        bcrypt.compare(password, existingUser.password, function(err, res) {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else if (res) {
                res
                    .status(200)
                    .cookie(
                        "access-token",
                        jwt.sign(
                            {
                                email: email,
                                username: existingUser.username,
                                userId: existingUser._id,
                            },
                            process.env.JWT_SECRET,
                        ),
                    )
                    .send("Signed in");
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const signOut = async (req, res) => {
    res.clearCookie("access-token").status(200).json({ message: "Signed out" });
};

export { createUser, signIn, signOut };
