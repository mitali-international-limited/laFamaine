const userModel = require("../models/form");

exports.addUserForm = async (req, res) => {
  const { email, message } = req.body;
  console.log("Req.body", req.body);

  const formObj = {
    email: email,
    message: message,
  };
  if (req.body.name) {
    formObj.name = req.body.name;
  }
  if (req.body.phone) {
    formObj.phone = req.body.phone;
  }
  const _newForm = new userModel(formObj);
  _newForm
    .save()
    .then((form) => {
      return res
        .status(201)
        .json({ message: "Your Message was sent Successfully! Thank you" });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Sorry, Something is wrong. Try again!" });
    });
  console.log("Email and message: ", email, message);
};
