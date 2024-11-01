require("dotenv").config();

const express = require("express");
const cors = require('cors');
const appRoutes = require("./routes/routes.js");
const userRoute = require("./routes/user.js");
const clientRoute = require("./routes/client.js");
const vehicleRoute = require("./routes/vehicle.js");
const authRoute = require("./routes/auth.js");
const app = express();
const mongoose = require("mongoose");

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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `app connected with mongo and listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
