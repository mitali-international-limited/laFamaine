const Category = require("../models/category");
const slugify = require("slugify");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      categoryName: cate.categoryName,
      categoryIcon: cate.categoryIcon,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
};

exports.addCategory = async (req, res, next) => {
  try {
    console.log("Category Body: ", req.body);
    const categoryObj = {
      categoryName: req.body.categoryName,
      slug: slugify(req.body.categoryName),
    };
    if (req.file) {
      categoryObj.categoryIcon =
        process.env.API + "/public/" + req.file.filename;
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat
      .save()
      .then((category) => {
        return res.status(201).json({ category });
      })
      .catch((error) => {
        return res.status(201).json({ error });
      });
    console.log("Image url: ", cat);

    // Add your logic for adding the category to the database or performing other actions
  } catch (error) {
    console.error("Error adding category: ", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

exports.getCategory = async (req, res) => {
  Category.find({})
    .then((categories) => {
      const categoryList = createCategories(categories);
      return res.status(201).json({ categoryList });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
