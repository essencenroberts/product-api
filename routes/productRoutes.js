const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

// function to handle errors
function mongooseError(res, err) {
  if (err.name === "ValidationError") {
  return res.status(400).json({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "That is not a valid product id"
    });
  }

  // if (err.code === 11000) {
  //   return res.status(409).json({
  //     message: "A product with that id already exists"
  //   });
  // }

  return res.status(500).json({ message: err.message });
}


// POST - create a product-> /api/products
router.post("/", async(req, res) => {
  try {
    //req.body
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);

  } catch (err) {
    mongooseError(res, err);
  }
});

// GET /api/products (all)
router.get("/", async (req, res) => {
  console.log('GET /api/products was hit - Mongoose state: ', mongoose.connection.readyState);
  try {
    // const products = await Products.find({});
    // res.status(200).json(products);
   
    
    const { category, minPrice, maxPrice, sortBy, page, limit } = req.query; // pull the query params out of req.query

    const filter = {}; // start with empty filter object

    if (category) {
      filter.category = category;
    }// only add if

    if (minPrice || maxPrice) {
      filter.price = {}; // empty box for price rules

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }// price range - min and max 

    // SORT

    let sort = {};
    if (sortBy === "price_asc") {
      sort = { price: 1 }; //cheapest
    } else if (sortBy === "price_desc") {
      sort = { price: -1 }; // expensive
    } else {
      sort = { createdAt: -1 }; // default
    }

    // PAGINATION 
    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.max(Number(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    // RUN IT: filter, sort, skip, limit
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Send back
    res.status(200).json(products);
  } catch (err) {
    mongooseError(res, err);
  }
});

  // GET read a single product -> /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ message: "product not found" })
    }
    res.status(200).json(product);
  } catch (err) {
    mongooseError( res, err); 
  }
});

// PUT update a product -> /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, 

        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    mongooseError(res, err);
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (err) {
    mongooseError(res, err);
  }
});

module.exports = router;
