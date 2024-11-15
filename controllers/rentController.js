const Rent = require("../models/Rent.js");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

//get all rents
const getRents = async (req, res) => {
  const rents = await Rent.find({}).sort({ createdAt: -1 });
  res.status(200).json(rents);
};

//get selected rent
const getRent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Rent not found" });
  }
  const rent = await Rent.findById(id);
  if (!rent) {
    return res.status(404).json({ err: "Rent not found" });
  }
  res.status(200).json(rent);
};

//get rent by selected client
const getRentsByClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const rents = await Rent.find({ client: clientId }).populate("vehicle");
    res.json(rents);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

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

    // Changing vehicle status to "in use"
    vehicle.status = "in use";
    await vehicle.save();

    res.status(200).json(rent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//return vehicle in rent
const returnVehicle = async (req, res) => {
  const { rentId } = req.body;

  try {
    const rent = await Rent.findById(rentId).populate("vehicle");
    if (!rent || rent.rentStatus === "cancelled") {
      return res.status(400).json({ error: "Invalid rent transaction" });
    }

    // Changing rent status to completed
    rent.rentStatus = "completed";
    await rent.save();

    // Changing vehicle status to "available"
    rent.vehicle.status = "available";
    await rent.vehicle.save();

    res.status(200).json(rent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete selected rent
const deleteRent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Rent not found" });
  }
  const rent = await Rent.findByIdAndDelete(id);
  if (!rent) {
    return res.status(404).json({ err: "Rent not found" });
  }
  res.status(200).json({ message: "Rent deleted" });
};

const updateRent = async (req, res) => {
  const { id } = req.params;
  const { rentDays } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Rent not found" });
  }

  try {
    const rent = await Rent.findById(id);
    if (!rent) {
      return res.status(404).json({ err: "Rent not found" });
    }

    const vehicle = await Vehicle.findById(rent.vehicle);
    if (!vehicle) {
      return res.status(404).json({ err: "Vehicle not found" });
    }

    const rentAmountUpdated = vehicle.costPerDay * rentDays;

    const updatedRent = await Rent.findOneAndUpdate(
      { _id: id },
      { ...req.body, rentAmount: rentAmountUpdated },
      { new: true }
    );

    res.status(200).json(updatedRent);
  } catch (err) {
    res.status(500).json({ err: "An error occurred while updating the rent" });
  }
};

module.exports = {
  getRents,
  getRent,
  getRentsByClient,
  createRent,
  deleteRent,
  updateRent,
  returnVehicle,
};
