const Vehicle = require("../models/Vehicle.js");
const mongoose = require("mongoose");

//get all vehicles
const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({}).sort({ createdAt: -1 });
  res.status(200).json(vehicles);
};

//get all availables vehicles
const getVehiclesAvailable = async (req, res) => {
  const availablesVehicles = await Vehicle.find({status: "available"}).sort({ createdAt: -1 });
  res.status(200).json(availablesVehicles);
};

//get selected vehicle
const getVehicle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Vehiclenot found" });
  }
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    return res.status(404).json({ err: "Vehicle not found" });
  }
  res.status(200).json(vehicle);
};
//create a new vehicle
const createVehicle = async (req, res) => {
  const {
    make,
    model,
    color,
    year,
    chassis,
    register,
    mileage,
    imageUrl,
    status,
    costPerDay,
    comments,
    lastServiceDate,
  } = req.body;
  //adding new vehicle to db.
  try {
    const vehicle = await Vehicle.create({
      make,
      model,
      color,
      year,
      chassis,
      register,
      mileage,
      imageUrl,
      status,
      costPerDay,
      comments,
      lastServiceDate,
    });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected vehicle
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Vehicle not found" });
  }
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ err: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//delete selected vehicle
const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Vehiclenot found" });
  }
  const vehicle = await Vehicle.findByIdAndDelete(id);
  if (!vehicle) {
    return res.status(404).json({ err: "Vehicle not found" });
  }
  res.status(200).json({ message: "Vehicle deleted" });
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle,
  getVehiclesAvailable,
};
