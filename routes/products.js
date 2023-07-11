const express = require('express');
const router = express.Router();
const multer = require('multer');

const productsController = require('../controllers/products_controller');

// Set up multer storage and file upload settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Specify the destination folder to save the images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for the uploaded image
    }
  });
  
  const upload = multer({ storage: storage });


// to get all the products
router.get('/', productsController.products);

// Create product route with file upload middleware
router.post('/create', upload.single('image'), productsController.create);

// to delete a product using it's ID
router.delete('/:productID', productsController.delete);

// to update the quantity of a product
router.post('/:productID/update_quantity/', productsController.updateQuantity);

// Update product's name route
router.put("/:productID/update_name", productsController.updateName);

// Update product description route
router.put("/:productID/update_description", productsController.updateDescription);

// Update product price route
router.put('/:productID/update_price', productsController.updatePrice);

module.exports = router;
