const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehicleSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    chassis: { type: String, required: true },
    register: { type: String, required: true },
    mileage: { type: Number, required: true },
    costPerDay: { type: Number, required: true},
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["available", "in use", "maintenance"],
      default: "maintenance",
      message: "{VALUE} is not supported",
      required: true,
    },
    comments: [{ body: String, date: Date }],
    lastServiceDate: {type: Date},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
