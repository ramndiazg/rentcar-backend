const Client = require("../models/Client.js");
const mongoose = require("mongoose");

//get all client
const getClients = async (req, res) => {
  const clients = await Client.find({}).sort({ createdAt: -1 });
  res.status(200).json(clients);
};
//get selected client
const getClient = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Client not found" });
  }
  const client = await Client.findById(id);
  if (!client) {
    return res.status(404).json({ err: "Client not found" });
  }
  res.status(200).json(client);
};
//create a new client
const createClient = async (req, res) => {
  const { firstName, lastName, phone, email, address, contact, preferredPaymentMethod, membershipStatus } =
    req.body;
  //adding new client to db.
  try {
    const client = await Client.create({
      firstName,
      lastName,
      phone,
      email,
      address,
      preferredPaymentMethod,
      membershipStatus,
    });
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//update selected client
const updateClient = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Client not found" });
  }
  try {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!client) {
      return res.status(404).json({ err: "Client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//delete selected client
const deleteClient = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Client not found" });
  }
  const client = await Client.findByIdAndDelete(id);
  if (!client) {
    return res.status(404).json({ err: "Client not found" });
  }
  res.status(200).json({ message: "Client deleted" });
};

module.exports = {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
