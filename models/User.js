const PersonSchema = require("./Person");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    ...PersonSchema.obj,
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      message: "{VALUE} is not supported",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
