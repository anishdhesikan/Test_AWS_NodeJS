// server.js

// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var Product = require('./app/models/product');

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/billboard', function (req, res) {
    res.json({ billboard_id: 1 });
});



router.route('/products')

    // get all the products (accessed at GET http://localhost:8080/api/products)
    .get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });



// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/products/:product_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function(req, res) {
        Product.findById(req.params.product_id, function (err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    })

// on routes that end in /products/:product_id
// ----------------------------------------------------
router.route('/change_billboard/:billboard_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/products/:product_id)
    .get(function (req, res) {
        Product.findById(10, function (err, product) {
            if (err)
                res.send(err);
            product.billboard_id = req.params.billboard_id;

            // save the product
            product.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });
        });
    })

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);