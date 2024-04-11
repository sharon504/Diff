import mongoose from "mongoose";
import User from "../models/user-model.js";

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("User has been updated...");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export { getUsers, getUser, deleteUser, updateUser };
