const express = require("express");
const verify = require("../auth/auth.js")
const {
  createRent,
  returnVehicle
} = require("../controllers/rentController.js");
const rentRoute = express.Router();

// rentRoute.get("/rent", verify.verifyToken, getRents);

// rentRoute.get("/rent/:id", verify.verifyToken, getRent);

rentRoute.post("/rent", verify.verifyToken, createRent);

rentRoute.post("/returnVehicle", verify.verifyToken, returnVehicle);

// rentRoute.delete("/rent/:id", verify.verifyToken, deleteRent);

// rentRoute.patch("/rent/:id", verify.verifyToken, updateRent);

module.exports = rentRoute;