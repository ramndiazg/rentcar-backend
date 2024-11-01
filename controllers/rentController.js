const Rent = require("../models/Rent.js");
const mongoose = require("mongoose");

//create a new rent
const createRent = async (req, res) => {
    const {  } = req.body;
    //adding new rent to db.
    try {
      const rent = await Rent.create({

      });
      res.status(200).json(rent);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };

module.exports = {
    createRent,
  };