const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

//Create and Save a new user
exports.signup = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const { fullName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);

    const _user = new userModel({
      fullName,
      email,
      hash_password,
      username: shortid.generate(),
    });
    const saveUser = await _user.save();
    if (saveUser) {
      console.log("Save User: ", saveUser);
      const token = jwt.sign({ _id: saveUser._id }, process.env.JWT_SECRET, {
        expiresIn: "52h",
      });

      res.cookie("token", token, { expiresIn: "52h" });
      console.log("Save token: ", token);
      return res.status(201).json({
        message: "Sign Up Successfully...!",
        token: token,
        user: {
          _id: saveUser._id,
          name: saveUser.fullName,
          email: saveUser.email,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid User Name or Password" });
    }

    const isPasswordValid = await user.authenticate(req.body.password);
    console.log("User: ", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid User Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });

    const { _id, fullName, email } = user;

    res.cookie("token", token, { expiresIn: "48h" });

    return res.status(200).json({
      token,
      user: {
        _id,
        fullName,
        email,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};
