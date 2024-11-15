const mongoose = require("mongoose");
const { Schema } = mongoose;

const RentSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true },
    rentStatus: {
      type: String,
      enum: ["actived", "completed", "cancelled"],
      default: "actived",
      message: "{VALUE} is not supported",
      required: true,
    },
    rentDays: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      default: 3,
      message: "{VALUE} is not supported",
      required: true
    },
    rentAmount: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rent", RentSchema);
