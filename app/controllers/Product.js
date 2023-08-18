const { hairProduct } = require("../models/HairProduct");
const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");

exports.addProduct = async (req, res) => {
  const { name, price, description, category, offer, color, size, weight } =
    req.body;

  try {
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    Category.findById(category)
      .then((foundCategory) => {
        if (foundCategory) {
          let productModel;

          switch (foundCategory.categoryType) {
            case "hair":
              console.log("Category Name hair: ", foundCategory.categoryType);
              productModel = hairProduct;
              break;
            default:
              console.log("Category Name", foundCategory.categoryType);
              productModel = Product;
              break;
          }

          const product = new productModel({
            name: name,
            slug: slugify(name),
            price,
            description,
            category,
            productPictures,
            offer,

            color,
            size,
            weight,
            createdBy: req.user._id,
          });

          product.save().then((savedProduct) => {
            res.status(201).json({ product: savedProduct });
          });
        } else {
          res.status(400).json({ error: "Category not found" });
        }
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").exec();
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};
exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const products = await Product.find({ category: categoryId })
      .populate("category")
      .exec();
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};
