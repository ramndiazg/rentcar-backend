const express = require("express");
const verify = require("../auth/auth.js")
const {
  createClient,
  getClient,
  getClients,
  deleteClient,
  updateClient,
} = require("../controllers/clientController.js");
const clientRoute = express.Router();

clientRoute.get("/client", verify.verifyToken, getClients);

clientRoute.get("/client/:id", verify.verifyToken, getClient);

clientRoute.post("/client", verify.verifyToken, createClient);

clientRoute.delete("/client/:id", verify.verifyToken, deleteClient);

clientRoute.patch("/client/:id", verify.verifyToken, updateClient);

module.exports = clientRoute;
