const { name } = require("ejs");
const Product = require("../models/product");

// function to show all the products
module.exports.products = function (req, res) {
  Product.find({}, function (err, foundProducts) {
    if (err) {
      res.send(err);
    } else {
      res.render("products", { products: foundProducts });
    }
  });
};

// function to create a new product
module.exports.create = function (req, res) {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    price: req.body.price,
    image: req.file.filename,
  });
  newProduct.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Product added successfully 😊");
    }
  });
};

// function to delete a product using it's ID
module.exports.delete = function (req, res) {
  Product.deleteOne({ _id: req.params.productID }, function (err) {
    if (err) {
      res.send(err);
    } else {
      message: "Product deleted Successfully";
      res.redirect("/products");
    }
  });
};

// function to update a product's quantity
module.exports.updateQuantity = function (req, res) {
  const ID = req.params.productID;

  // find the product using id
  Product.findById(ID, function (err, found) {
    if (err) {
      res.send(err);
    } else {
      const newQty = parseInt(found.quantity) + parseInt(req.query.number);

      // update the product's quantity
      Product.findByIdAndUpdate(
        ID,
        {
          quantity: newQty,
        },

        function (err, updatedProduct) {
          if (err) {
            res.send(err);
          } else {
            updatedProduct.quantity = newQty;

            res.send({
              product: updatedProduct,
              message: "updated successfully",
            });
          }
        }
      );
    }
  });
};


// function to update a product's name
module.exports.updateName = function (req, res) {
  const productId = req.params.productID;
  const newName = req.body.name;

  // Find the product by ID and update the name
  Product.findByIdAndUpdate(
    productId,
    { $set: { name: newName } },
    { new: true },
    function (err, updatedProduct) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          product: updatedProduct,
          message: "Name updated successfully",
        });
      }
    }
  );
};


// function to update a product's description
module.exports.updateDescription = function (req, res) {
  const productId = req.params.productID;
  const newDescription = req.body.description;

  // Find the product by ID and update the description
  Product.findByIdAndUpdate(
    productId,
    { $set: { description: newDescription } },
    { new: true },
    function (err, updatedProduct) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          product: updatedProduct,
          message: "Description updated successfully",
        });
      }
    }
  );
};


// function to update a product's price
module.exports.updatePrice = function (req, res) {
  const productId = req.params.productID;
  const newPrice = req.body.price;

  // Find the product by ID and update the price
  Product.findByIdAndUpdate(
    productId,
    { $set: { price: newPrice } },
    { new: true },
    function (err, updatedProduct) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          product: updatedProduct,
          message: "Price updated successfully",
        });
      }
    }
  );
};

