const Order = require("../models/order"); // Import your Order model

exports.checkout = async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    // Create a new order in the database
    const newOrder = new Order({
      cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      user: req.user._id, // Assuming you have user authentication
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while placing the order" });
  }
};
