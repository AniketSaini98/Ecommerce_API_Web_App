const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const methodOverride = require('method-override');
const multer = require('multer');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ecommerce';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configure static file serving for images
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use('/products', require('./routes/products'));

app.listen(3000, function(){
    console.log(`Server is running on port ${PORT}`);
});
