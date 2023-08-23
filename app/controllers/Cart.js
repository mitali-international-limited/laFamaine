const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).exec();
    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the cart" });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  console.log("Product ID: ", userId);
  console.log("Product quantity: ", quantity);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    console.log("Cart: ", cart);

    if (!cart) {
      cart = new Cart({ userId, products: [{ product: productId, quantity }] });
    } else {
      const existingProduct = cart.products.find((item) =>
        item.product.equals(productId)
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding to cart" });
  }
};
