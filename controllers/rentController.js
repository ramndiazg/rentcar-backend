const Rent = require("../models/Rent.js");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

//create a new rent
const createRent = async (req, res) => {
  const { clientId, vehicleId, userId, rentDays } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (vehicle.status !== "available") {
      return res.status(400).json({ error: "Vehicle not available" });
    }

    if (!vehicle) {
      return res.status(400).json({ error: "Vehicle not found" });
    }

    const rentAmount = vehicle.costPerDay * rentDays;

    const rent = await Rent.create({
      client: clientId,
      vehicle: vehicleId,
      user: userId,
      rentDays,
      rentAmount,
    });

    //changing status in vehicle
    vehicle.status = "in use";
    await vehicle.save();

    res.status(200).json(rent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createRent,
  };
