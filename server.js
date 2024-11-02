require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const appRoutes = require("./routes/routes.js");
const userRoute = require("./routes/user.js");
const clientRoute = require("./routes/client.js");
const vehicleRoute = require("./routes/vehicle.js");
const authRoute = require("./routes/auth.js");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", appRoutes);
app.use("/api", userRoute);
app.use("/api", clientRoute);
app.use("/api", vehicleRoute);
app.use("/api", authRoute);

//connect
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `App connected with MongoDB and listening on port ${process.env.PORT}`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = app;
