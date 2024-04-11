import mongoose from "mongoose";
import User from "../src/models/user.js";
const addTestData = (dummyUsers) => {
  dummyUsers.forEach((user) => {
    const newUser = new User(user);
    newUser
      .save()
      .then(() => {
        console.log("User added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default addTestData;
