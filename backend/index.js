const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
const Routes = require("./routes");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/route", Routes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
