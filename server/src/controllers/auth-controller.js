import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    const existingUser = await User.findOne({ email: email }).select(
      "+password",
    );
    console.log(existingUser);
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = bcryptjs.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .cookie(
        "access-token",
        jwt.sign(
          {
            userId: existingUser._id,
          },
          process.env.JWT_SECRET,
        ),
      )
      .send("Signed in");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("access-token").status(200).json({ message: "Signed out" });
};

export { createUser, signIn, signOut };
