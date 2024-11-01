const express = require("express");
const verify = require("../auth/auth.js")
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");
const userRoute = express.Router();

userRoute.get("/user", verify.verifyToken, getUsers);

userRoute.get("/user/:id", verify.verifyToken, getUser);

userRoute.post("/user", verify.verifyToken, createUser);

userRoute.delete("/user/:id", verify.verifyToken, deleteUser);

userRoute.patch("/user/:id", verify.verifyToken, updateUser);

module.exports = userRoute;
