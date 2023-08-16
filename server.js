const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv");
const dbConfig = require("./app/db.config.js");

const userRouter = require("./app/routes/User.js");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb config

//mongo db connection
async function connect() {
  try {
    await mongoose.connect(dbConfig.url);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error: ", error);
  }
}
connect();
// environment variable
env.config();

//simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome  333 to la famaine application" });
});

//routes
app.use("/auth", userRouter);

//set port, listen for request

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
