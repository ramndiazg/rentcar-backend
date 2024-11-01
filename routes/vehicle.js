const express = require("express");
const verify = require("../auth/auth.js")
const {
  createVehicle,
  getVehicles,
  getVehiclesAvailable,
  getVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicleController.js");
const vehicleRoute = express.Router();

vehicleRoute.get("/vehicle", verify.verifyToken, getVehicles);

vehicleRoute.get("/vehicle/:id", verify.verifyToken, getVehicle);

vehicleRoute.get("/vehiclesavailables", getVehiclesAvailable);

vehicleRoute.post("/vehicle", verify.verifyToken, createVehicle);

vehicleRoute.delete("/vehicle/:id", verify.verifyToken, deleteVehicle);

vehicleRoute.patch("/vehicle/:id", verify.verifyToken, updateVehicle);

module.exports = vehicleRoute;
