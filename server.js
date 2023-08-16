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
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

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
