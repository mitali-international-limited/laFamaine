const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv");
const dbConfig = require("./app/db.config.js");
const path = require("path");

const userRouter = require("./app/routes/User.js");
const categoryRouter = require("./app/routes/Category.js");
const productRouter = require("./app/routes/Product.js");
const productCart = require("./app/routes/Cart.js");
const checkoutOrder = require("./app/routes/Order.js");
const userForm = require("./app/routes/UserForm.js");
const sliderImage = require("./app/routes/Slider.js");

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
app.use("/public", express.static(path.join(__dirname, "app", "uploads")));

//routes
app.use("/auth", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", productCart);
app.use("/order", checkoutOrder);
app.use("/user", userForm);
app.use("/home", sliderImage);

//set port, listen for request

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
